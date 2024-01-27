import { Prisma } from '@prisma/client';
import { db } from "../../lib/db";

const CalendarResolver = {
  Query: {
    async calendars() {
      try {
        const calendars = await db.calendar.findMany({
          include: {
            canReadMembers: true,
            canWriteMembers: true,
            articles: true,
          }
        });

        console.log('CALENDAR RESOLVER, db.calendar.findMany: ', calendars)
        return calendars.map(calendar => ({
          ...calendar,
          canReadMembers: calendar.canReadMembers || [],
          canWriteMembers: calendar.canWriteMembers || [],
          articles: calendar.articles || [],
        }))
      } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching calendars');
      }
    },
    async calendarsByUser(_: any, { userId }: { userId: string }) {
      return await db.calendar.findMany({
        where: {
          OR: [
            { canReadMembers: { some: { id: userId } } },
            { canWriteMembers: { some: { id: userId } } }
          ]
        },
        include: {
          canReadMembers: true,
          canWriteMembers: true,
          articles: true
        }
      });
    },
    async calendar(_: any, { calendarId }: { calendarId: string }) {
      return await db.calendar.findUnique({
        where: { id: calendarId },
        include: {
          canReadMembers: true,
          canWriteMembers: true,
          articles: true,
        }
      });
    },
  },
  Mutation: {
    async createCalendar(_: any, { calendarInput }: { calendarInput: Prisma.CalendarCreateInput }) {
      return await db.calendar.create({
        data: calendarInput,
        include: {
          creator: true,
          canReadMembers: true,
          canWriteMembers: true,
          articles: true,
          invites: true,
          requests: true,
          emailMembers: true,
        }
      }).then(createdCalendar => ({
        ...createdCalendar,
        canReadMembers: [],
        canWriteMembers: [],
        articles: [],
        invites: [],
        requests: [],
        emailMembers: [],
      }));
    },
    async deleteCalendar(_: any, { calendarId }: { calendarId: string }) {
      await db.calendar.delete({ where: { id: calendarId } });
      return { message: 'Calendar deleted successfully' };
    },
    async addEmailMemberToCalendar(_: any, { calendarId, email }: { calendarId: string, email: string }) {
      return await db.calendar.update({
        where: { id: calendarId },
        data: {
          emailMembers: {
            create: { email }
          }
        },
        include: {
          creator: true,
          canReadMembers: true,
          canWriteMembers: true,
          articles: true,
          invites: true,
          requests: true,
          emailMembers: true,
        }
      });
    },
  },

}

export default CalendarResolver;