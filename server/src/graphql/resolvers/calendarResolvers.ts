import { Prisma } from '@prisma/client';
import { db } from "../../lib/db";

const CalendarResolver = {
  Query: {
    async calendars() {
      return await db.calendar.findMany({
        include: {
          creator: true,
          canReadMembers: true,
          canWriteMembers: true
        }
      });
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
          creator: true,
          canReadMembers: true,
          canWriteMembers: true
        }
      });
    },
    async calendar(_: any, { calendarId }: { calendarId: string }) {
      return await db.calendar.findUnique({
        where: { id: calendarId },
        include: {
          creator: true,
          canReadMembers: true,
          canWriteMembers: true
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
          canWriteMembers: true
        }
      });
    },
    async deleteCalendar(_: any, { calendarId }: { calendarId: string }) {
      await db.calendar.delete({ where: { id: calendarId } });
      return { message: 'Calendar deleted successfully' };
    },
  },

}

export default CalendarResolver;