import { db } from '../../lib/db';
import { sendEmail } from '../../middleware/mailer';

const RequestResolver = {
  Query: {
    async requests() {
      return await db.request.findMany({
        include: {
          user: true,
          calendar: true
        }
      });
    },
  },
  Mutation: {
    async createRequest(_: any, { calendarId, userId }: { calendarId: string; userId: string }) {
      if (!calendarId || !userId) {
        throw new Error('Missing required fields');
      }

      const user = await db.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw new Error('User not found');
      }

      const request = await db.request.create({
        data: { calendarId, userId }
      });

      // Populate fields after creation
      await db.request.findUnique({
        where: { id: request.id },
        include: {
          user: true,
          calendar: true
        }
      });

      await sendEmail('New Request Submitted', 'A new request has been submitted.', user.email);

      return request;
    },
    async updateRequestStatus(_: any, { requestId, calendarId, status, message }: { requestId: string; calendarId: string, status: string; message: string }) {
      try {
        const request = await db.request.findUnique({
          where: { id: requestId },
          include: {
            user: {
              select: {
                username: true,
                email: true
              }
            },
            calendar: true,
          }
        });

        if (!request) {
          throw new Error('Request not found');
        }

        // Update the request status and message
        const updatedRequest = await db.request.update({
          where: { id: requestId },
          data: {
            status,
            message,
          },
          include: {
            user: true,
            calendar: true,

          }
        });

        // If status is 'Approved', update the target calendar's canReadMembers
        if (status === 'Approved') {
          const userId = updatedRequest.user.id;

          const targetCalendar = await db.calendar.findUnique({
            where: { id: updatedRequest.calendar.id }, include: { canReadMembers: true }
          });

          if (targetCalendar) {
            const currentMembers = targetCalendar.canReadMembers || [];
            const userExists = currentMembers.some((member) => member.id === userId);
            if (!userExists) {
              await db.calendar.update({
                where: { id: targetCalendar.id },
                data: {
                  canReadMembers: {
                    connect: {
                      id: userId,
                    },
                  },
                },
              });
            }
          }
        }
        // Send an email notification about the status update
        const emailContent = `
          <h2>Request Status Update</h2>
          <p>The status of your request has been updated to ${status}.</p>
          ${message ? `<p>Message: ${message}</p>` : ''}
        `;

        await sendEmail('Request Status Updated', emailContent, request.user.email);

        // Return the updated request
        return {
          message: 'Status updated successfully',
          request: updatedRequest
        };
      } catch (error) {
        throw new Error('An error occurred while updating the status');
      }
    },
    async deleteRequest(_: any, { requestId }: { requestId: string }) {
      await db.request.delete({
        where: { id: requestId }
      });

      return { message: 'Request deleted successfully' };
    },
  }
};

export default RequestResolver;
