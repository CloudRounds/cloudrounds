import { Calendar, CalendarCreateInput } from '@/types';
import axios from 'axios';
import { FETCH_CALENDARS_QUERY } from './queries/FetchCalendarsQuery';
import { client } from '@/utils/apolloClient';
import { UPDATE_CALENDAR_MUTATION } from './mutations/UpdateCalendarMutation';
import { CREATE_CALENDAR_MUTATION } from './mutations/CreateCalendarMutation';
import { DELETE_CALENDAR_MUTATION } from './mutations/DeleteCalendarMutation';
import { REMOVE_USER_FROM_CALENDAR_MUTATION } from './mutations/RemoveUserFromCalendar';

const isDevelopment = process.env.NODE_ENV === 'development';
const baseUrl = isDevelopment ? 'http://localhost:3003' : '';

export const fetchCalendars = async (userId: string) => {
  try {
    const { data } = await client.query({
      query: FETCH_CALENDARS_QUERY,
      variables: { userId: userId },
      fetchPolicy: 'network-only',
    });
    return data.calendars;
  } catch (error) {
    console.error('Error fetching calendars:', error);
  }
};

export const removeUserFromPurpose = async (purposeName: string, userId: string) => {
  try {
    const response = await axios.put(`${baseUrl}/api/purposes/remove-user`, {
      purposeName,
      userId
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCalendar = async ({ calendarId, editedCalendar }: { calendarId: string, editedCalendar: Calendar }) => {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_CALENDAR_MUTATION,
      variables: { calendarId, editedCalendar },
    });
    return data.updatePurpose;
  } catch (error) {
    console.error('Error updating purpose:', error);
  }
};


export const createCalendar = async (calendar: CalendarCreateInput) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_CALENDAR_MUTATION,
      variables: { calendar },
    });
    console.log('Purpose created:', data.createPurpose);
    return data.createPurpose;
  } catch (error) {
    console.error('Error creating purpose:', error);
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
    console.error('Error deleting purpose:', error);
  }
};

export const deleteUserFromCalendar = async (userId: string, calendarId: string) => {
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
    const calendarUserIds = calendar.canReadMembers.map(user => user.id);
    return calendarUserIds.includes(userId)
  });
};

export const getCanWritePermissions = (calendars: Calendar[], userId: string) => {
  return calendars.filter(calendar => {
    const calendarUserIds = calendar.canWriteMembers.map(user => user.id);
    return calendarUserIds.includes(userId)
  });
};
