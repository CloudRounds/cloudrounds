import { Calendar, CreateCalendarInput } from '@/types';
import apiClient from '@/utils/apiClient';


export const fetchCalendars = async (userId: string | undefined) => {
  if (!userId) return [];
  try {
    const response = await apiClient.get(`/calendars/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching calendars:', error);
  }
};

export const fetchAllCalendars = async () => {
  try {
    const response = await apiClient.get('/calendars');
    return response.data;
  } catch (error) {
    console.error('Error fetching calendars:', error);
  }
};

export const updateCalendar = async (calendarId: string, editedCalendar: CreateCalendarInput) => {
  try {
    const response = await apiClient.put(`/calendars/update/${calendarId}`, editedCalendar);
    return response.data;
  } catch (error) {
    console.error('Error updating calendar:', error);
  }
};

export const createCalendar = async (calendar: CreateCalendarInput) => {
  try {
    const response = await apiClient.post('/calendars/new', calendar);
    return response.data;
  } catch (error) {
    console.error('Error creating calendar:', error);
  }
};

export const deleteCalendar = async (calendarId: string) => {
  try {
    const response = await apiClient.delete(`/calendars/purpose/${calendarId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting calendar:', error);
  }
};


export const addEmailMemberToCalendar = async (calendarId: string, email: string) => {
  try {
    const response = await apiClient.post('/calendars/add-email-member', { calendarId, email });
    return response.data;
  } catch (error) {
    console.error('Error adding email member to calendar:', error);
  }
};

export const removeUserFromCalendar = async (userId: string, calendarId: string) => {
  try {
    const response = await apiClient.post('/calendars/remove-user', { userId, calendarId });
    return response.data;
  } catch (error) {
    console.error('Error removing user from calendar:', error);
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
