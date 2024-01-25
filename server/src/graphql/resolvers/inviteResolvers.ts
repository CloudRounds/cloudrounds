import { db } from '../../lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendRegistrationLink } from '../../middleware/mailer';
import { Prisma } from '@prisma/client';

const InviteResolver = {
  Query: {
    async invites() {
      return await db.invite.findMany();
    },
    async invite(_: any, { token }: { token: string }) {
      return await db.invite.findUnique({
        where: { token }
      });
    },
  },
  Mutation: {
    async createInvite(_: any, { inviteInput }: { inviteInput: Prisma.InviteCreateInput }) {
      const invite = await db.invite.create({
        data: inviteInput
      });

      // Send email with registration link
      const registrationLink = `http://cloudrounds.com/register?token=${invite.token}`;
      const emailContent = `
        <h2>Invitation to join CloudRounds</h2>
        <p>${invite.creator} invited you to join "${invite.calendarName}" on our platform. Please use the registration link below to sign up and access the calendar.</p>
        <a href="${registrationLink}">Register Now</a>
      `;

      await sendRegistrationLink({
        to: invite.email,
        subject: 'You have been invited to join our platform!',
        html: emailContent
      });

      return invite;
    },
    async registerWithToken(_: any, { token, username, email, password, university, firstName, lastName }: { token: string; username: string; email: string; password: string; university: string; firstName: string; lastName: string }) {
      // verify the token
      const invite = await db.invite.findUnique({ where: { token } });
      if (!invite) {
        throw new Error('Invalid or expired token');
      }

      // check if username and email already exist
      const existingUserByEmail = await db.user.findUnique({ where: { email } });

      if (existingUserByEmail) {
        throw new Error('Email already exists');
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const newUser = await db.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          university,
          firstName,
          lastName,
          emailValidated: true
        }
      });

      // Update the associated calendar calendar
      const calendar = await db.calendar.findUnique({
        where: { id: invite.calendarId },
        include: { canReadMembers: true }
      });
      if (calendar) {
        await db.calendar.update({
          where: { id: calendar.id },
          data: {
            canReadMembers: {
              set: calendar.canReadMembers
            }
          }
        });
      }

      // Generate a JWT token
      const userToken = jwt.sign({ username: newUser.username, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET as string, {
        expiresIn: '72h'
      });

      // Prepare the response
      const userResponse = {
        username: newUser.username,
        email: newUser.email,
        university: newUser.university,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        emailValidated: newUser.emailValidated
      };

      return {
        message: 'User successfully registered',
        token: userToken,
        user: userResponse
      };
    },

    async deleteInvite(_: any, { token }: { token: string }) {
      await db.invite.delete({
        where: { token }
      });
      return { message: 'Invite deleted successfully' };
    },
  }
};

export default InviteResolver;
