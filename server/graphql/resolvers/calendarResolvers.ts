import { db } from "../../lib/db";
import { fromGlobalId, toGlobalId } from '../helpers/utils';
import { CreateCalendarInput } from '../generated/types';

const CalendarResolver = {
  Query: {
    async calendars() {
      try {
        const calendars = await db.calendar.findMany();
        console.log('CALENDAR RESOLVER, prisma.calendar.findMany: ', calendars)
        return calendars.map(calendar => ({
          ...calendar,
          id: toGlobalId('Calendar', calendar.id)
        }));
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
      const { id: localId } = fromGlobalId(calendarId);

      const calendar = await db.calendar.findUnique({
        where: { id: localId },
        include: {
          canReadMembers: true,
          canWriteMembers: true,
          articles: true,
        }
      });

      if (!calendar) {
        throw new Error(`Calendar with ID ${localId} not found`);
      }

      return {
        ...calendar,
        id: toGlobalId('Calendar', calendar.id)
      };
    },
  },
  Mutation: {
    async createCalendar(_: any, { calendarInput }: { calendarInput: CreateCalendarInput }) {
      return await db.calendar.create({
        data: calendarInput,
        include: {
          creator: true,
          canReadMembers: true,
          canWriteMembers: true,
        }
      }).then(createdCalendar => ({
        ...createdCalendar,
        canReadMembers: [createdCalendar.creator],
        canWriteMembers: [createdCalendar.creator],
        articles: [],
        invites: [],
        requests: [],
        emailMembers: [],
      }));
    },
    async deleteCalendar(_: any, { calendarId }: { calendarId: string }) {
      const { id } = fromGlobalId(calendarId);
      await db.calendar.delete({ where: { id } });
      return { message: 'Calendar deleted successfully' };
    },
    async addEmailMemberToCalendar(_: any, { calendarId, email }: { calendarId: string, email: string }) {
      const { id } = fromGlobalId(calendarId);
      return await db.calendar.update({
        where: { id },
        data: {
          emailMembers: {
            create: { email }
          }
        }
      });
    },
  },

}

export default CalendarResolver;