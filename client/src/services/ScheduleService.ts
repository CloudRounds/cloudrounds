import { Schedule } from '@/types';
import apiClient from '@/utils/apiClient';


export const fetchSchedules = async () => {
  try {
    const response = await apiClient.get('/schedules');
    return response.data;
  } catch (error) {
    console.error('There was an error fetching schedules:', error);
    throw error;
  }
};

export const createSchedule = async (scheduleData: Omit<Schedule, 'id' | 'events' | 'createdAt'>) => {
  try {
    const response = await apiClient.post('/schedules', scheduleData);
    return response.data;
  } catch (error) {
    console.error('There was an error creating the schedule:', error);
    throw error;
  }
};

export const updateSchedule = async (id: string, scheduleData: Partial<Omit<Schedule, 'id' | 'events' | 'createdAt'>>) => {
  try {
    const response = await apiClient.put(`/schedules/${id}`, scheduleData);
    return response.data;
  } catch (error) {
    console.error('There was an error updating the schedule:', error);
    throw error;
  }
};

export const deleteSchedule = async (id: string) => {
  try {
    await apiClient.delete(`/schedules/${id}`);
    return { success: true };
  } catch (error) {
    console.error('There was an error deleting the schedule:', error);
    throw error;
  }
};
