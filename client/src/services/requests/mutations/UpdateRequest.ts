import { gql } from '@apollo/client';

export const UPDATE_REQUEST_STATUS_MUTATION = gql`
  mutation UpdateRequestStatus($requestId: ID!, $status: String!, $message: String) {
    updateRequestStatus(requestId: $requestId, status: $status, message: $message) {
      message
      updatedRequest {
        id
        status
        calendarId
        userId
        yearOfStudy
        email
        message
      }
    }
  }
`;
