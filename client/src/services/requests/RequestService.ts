import { compareDates } from '@/utils/dates';
import { client } from '@/utils/apolloClient';

import { FETCH_REQUESTS_QUERY } from './queries/Requests';
import { UPDATE_REQUEST_STATUS_MUTATION } from './mutations/UpdateRequest';
import { CREATE_REQUEST_MUTATION } from './mutations/CreateRequest';
import { DELETE_REQUEST_MUTATION } from './mutations/DeleteRequest';


export const updateRequestStatus = async (
  requestId: string,
  calendarId: string,
  status: string,
  message: string,
) => {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_REQUEST_STATUS_MUTATION,
      variables: { requestId, status, calendarId, message },
    });
    return data.updateRequestStatus;
  } catch (error) {
    console.error('Error updating request status:', error);
  }
};

export const createRequest = async (calendarId: string, userId: string) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_REQUEST_MUTATION,
      variables: { calendarId, userId },
    });
    return data.createRequest;
  } catch (error) {
    console.error('There was an error creating the request:', error);
  }
};

export const deleteRequest = async (requestId: string) => {
  try {
    const { data } = await client.mutate({
      mutation: DELETE_REQUEST_MUTATION,
      variables: { requestId },
    });
    return data.deleteRequest;
  } catch (error) {
    console.error('Error deleting request:', error);
  }
};

export const fetchRequests = async () => {
  try {
    const { data } = await client.query({
      query: FETCH_REQUESTS_QUERY,
    });
    return data.requests;
  } catch (error) {
    console.error('Error fetching requests:', error);
  }
};


export const sortRequests = (requests: Request[]) => {
  return requests.sort((a, b) => {
    return compareDates(a, b);
  });
};
