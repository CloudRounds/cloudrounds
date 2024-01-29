import apiClient from '@/utils/apiClient';
import { compareDates } from '@/utils/dates';


export const createRequest = async (calendarId: string, userId: string) => {
  try {
    const response = await apiClient.post('/requests/new', { calendarId, userId });
    return response.data;
  } catch (error) {
    console.error('There was an error creating the request:', error);
  }
};

export const createBulkRequests = async (userIds: string[], calendarId: string) => {
  try {
    const response = await apiClient.post('/requests/bulk-new', { calendarId, userIds });
    return response.data.requests;
  } catch (error) {
    console.error('There was an error creating bulk requests:', error);
  }
};

export const updateRequestStatus = async (requestId: string, status: string, message: string, calendarId: string, email: string) => {
  try {
    const response = await apiClient.put(`/requests/${requestId}/status`, { status, message, calendarId, email });
    return response.data;
  } catch (error) {
    console.error('Error updating request status:', error);
  }
};

export const deleteRequest = async (requestId: string) => {
  try {
    const response = await apiClient.delete(`/requests/${requestId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting request:', error);
  }
};

export const fetchRequests = async () => {
  try {
    const response = await apiClient.get('/requests');
    return response.data;
  } catch (error) {
    console.error('Error fetching requests:', error);
  }
};

export const sortRequests = (requests: Request[]) => {
  return requests.sort((a, b) => {
    return compareDates(a, b);
  });
};
