import { db } from '../../lib/db';
import { sendEmail } from '../../middleware/mailer';
import { CreateBulkRequestsInput, CreateRequestInput, DeleteRequestInput, UpdateRequestStatusInput } from '../generated/types';
import { fromGlobalId, toGlobalId } from '../helpers/utils';

const RequestResolver = {
  Query: {
    async requests(_: any, { first, after }: { first?: number; after?: string }) {
      let cursor = after ? { id: after } : undefined;
      let requests = await db.request.findMany({
        take: first,
        cursor,
        orderBy: { id: 'asc' },
        include: {
          user: true,
          calendar: true
        }
      });

      const edges = requests.map(request => ({
        cursor: request.id,
        node: {
          ...request,
          id: toGlobalId('Request', request.id),
        },
      }));

      let startCursor = edges.length > 0 ? edges[0].cursor : null;
      let endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

      return {
        edges,
        pageInfo: {
          hasNextPage: edges.length === first,
          hasPreviousPage: !!after,
          startCursor,
          endCursor,
        },
      };
    },
  },
  Mutation: {
    async createRequest(_: any, { input }: { input: CreateRequestInput }) {
      const { calendarId, userId, clientMutationId } = input;

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

      return {
        request: { ...request, id: toGlobalId('Request', request.id) },
        clientMutationId,
      };
    },
    async updateRequestStatus(_: any, { input }: { input: UpdateRequestStatusInput }) {
      const { requestId, calendarId, status, clientMutationId } = input;
      const localRequestId = fromGlobalId(requestId).id;
      const localCalendarId = fromGlobalId(calendarId).id;

      try {
        const request = await db.request.findUnique({
          where: { id: localRequestId },
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

        const updatedRequest = await db.request.update({
          where: { id: localRequestId },
          data: {
            status,
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
            where: { id: localCalendarId }, include: { canReadMembers: true }
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
        `;

        await sendEmail('Request Status Updated', emailContent, request.user.email);

        // Return the updated request
        return {
          status: updatedRequest.status,
          updatedRequest: { ...updatedRequest, id: toGlobalId('Request', updatedRequest.id) },
          clientMutationId,
        };
      } catch (error) {
        throw new Error('An error occurred while updating the status');
      }
    },
    async deleteRequest(_: any, { input }: { input: DeleteRequestInput }) {
      const { requestId, clientMutationId } = input;
      const localRequestId = fromGlobalId(requestId).id;

      await db.request.delete({
        where: { id: localRequestId }
      });

      return {
        deletedRequestId: toGlobalId('Request', localRequestId),
        clientMutationId,
      };
    },
    async createBulkRequests(_: any, { input }: { input: CreateBulkRequestsInput }) {
      const { userIds, calendarId, clientMutationId } = input;
      const localCalendarId = fromGlobalId(calendarId).id;
      const createdRequests = [];

      for (const userId of userIds) {
        try {
          const createdRequest = await db.request.create({
            data: {
              userId: userId,
              calendarId: localCalendarId,
            },
          });
          createdRequests.push(createdRequest);
        } catch (error) {
          console.error('Error creating request for user:', userId, error);
        }
      }

      return {
        requests: createdRequests.map(request => ({ ...request, id: toGlobalId('Request', request.id) })),
        clientMutationId,
      };
    },
  },
};

export default RequestResolver;
