import { Calendar, CalendarCreateInput } from '@/types';
import { FETCH_CALENDARS_QUERY } from './queries/FetchCalendarsQuery';
import { client } from '@/utils/apolloClient';
import { UPDATE_CALENDAR_MUTATION } from './mutations/UpdateCalendarMutation';
import { CREATE_CALENDAR_MUTATION } from './mutations/CreateCalendarMutation';
import { DELETE_CALENDAR_MUTATION } from './mutations/DeleteCalendarMutation';
import { REMOVE_USER_FROM_CALENDAR_MUTATION } from './mutations/RemoveUserFromCalendar';
import { ADD_EMAIL_MEMBER_MUTATION } from './mutations/AddEmailMemberToCalendar';
import { FETCH_CALENDARS_BY_USER_QUERY } from './queries/FetchCalendarsByUserQuery';


export const fetchCalendars = async (userId: string) => {
  try {
    const { data } = await client.query({
      query: FETCH_CALENDARS_BY_USER_QUERY,
      variables: { userId: userId },
      fetchPolicy: 'network-only',
    });
    return data.calendars;
  } catch (error) {
    console.error('Error fetching calendars:', error);
  }
};

export const fetchAllCalendars = async () => {
  try {
    console.log('CalendarService – Fetching all calendars...')
    const { data } = await client.query({
      query: FETCH_CALENDARS_QUERY,
      fetchPolicy: 'network-only',
    });
    console.log('CalendarService – Fetched data:', data)
    return data.calendars;
  } catch (error) {
    console.error('Error fetching calendars:', error);
  }
}


export const updateCalendar = async ({ calendarId, editedCalendar }: { calendarId: string, editedCalendar: CalendarCreateInput }) => {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_CALENDAR_MUTATION,
      variables: { calendarId, editedCalendar },
    });
    return data.updateCalendar;
  } catch (error) {
    console.error('Error updating calendar:', error);
  }
};


export const createCalendar = async (calendar: CalendarCreateInput) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_CALENDAR_MUTATION,
      variables: { calendar },
    });
    console.log('Calendar created:', data.createCalendar);
    return data.createCalendar;
  } catch (error) {
    console.error('Error creating calendar:', error);
  }
};

export const deleteCalendar = async (calendarId: string) => {
  try {
    const { data } = await client.mutate({
      mutation: DELETE_CALENDAR_MUTATION,
      variables: { calendarId },
    });
    return data.deleteCalendar;
  } catch (error) {
    console.error('Error deleting calendar:', error);
  }
};

export const addEmailMemberToCalendar = async (calendarId: string, email: string) => {
  try {
    const { data } = await client.mutate({
      mutation: ADD_EMAIL_MEMBER_MUTATION,
      variables: { calendarId, email },
    });
    return data.addEmailMemberToCalendar;
  } catch (error) {
    console.error('Error adding email member to calendar:', error);
  }
};

export const removeUserFromCalendar = async (userId: string, calendarId: string) => {
  try {
    const { data } = await client.mutate({
      mutation: REMOVE_USER_FROM_CALENDAR_MUTATION,
      variables: { userId, calendarId },
    });
    return data.removeUserFromCalendar;
  } catch (error) {
    console.error('Error deleting user from calendar:', error);
  }
};


export const getCanReadPermissions = (calendars: Calendar[], userId: string) => {
  return calendars.filter(calendar => {
    const calendarUserIds = calendar.canReadMembers?.map(user => user?.id);
    return calendarUserIds?.includes(userId)
  });
};

export const getCanWritePermissions = (calendars: Calendar[], userId: string) => {
  return calendars.filter(calendar => {
    const calendarUserIds = calendar.canWriteMembers?.map(user => user?.id);
    return calendarUserIds?.includes(userId)
  });
};
