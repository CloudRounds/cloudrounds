import { ScheduleEvent, Task } from '@/types';
import apiClient from '@/utils/apiClient';

// Fetch all events for a specific schedule
export const fetchScheduleEvents = async (scheduleId: string): Promise<ScheduleEvent[]> => {
  try {
    const response = await apiClient.get(`/scheduleEvents/schedule/${scheduleId}`);
    return response.data;
  } catch (error) {
    console.error(`There was an error fetching events for schedule ${scheduleId}:`, error);
    throw error;
  }
};

// Fetch all events for the current user
export const fetchUserEvents = async (userId: string): Promise<ScheduleEvent[]> => {
  try {
    const response = await apiClient.get(`/scheduleEvents/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('There was an error fetching events:', error);
    throw error;
  }
};

// Add a new event to a schedule
export const createScheduleEvent = async (eventData: Omit<ScheduleEvent, 'id' | 'createdAt'>): Promise<ScheduleEvent> => {
  try {
    const response = await apiClient.post('/scheduleEvents', eventData)
    return response.data;
  } catch (error) {
    console.error('There was an error creating the event:', error);
    throw error;
  }
};

// Update an existing event
export const updateScheduleEvent = async (id: string, eventData: Partial<Omit<ScheduleEvent, 'id' | 'createdAt'>>): Promise<ScheduleEvent> => {
  try {
    const response = await apiClient.put(`/scheduleEvents/events/${id}`, eventData);
    return response.data;
  } catch (error) {
    console.error('There was an error updating the event:', error);
    throw error;
  }
};

// Delete an event
export const deleteScheduleEvent = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/scheduleEvents/events/${id}`);
  } catch (error) {
    console.error('There was an error deleting the event:', error);
    throw error;
  }
};



