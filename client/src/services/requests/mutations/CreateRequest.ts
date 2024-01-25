import { gql } from '@apollo/client';

export const CREATE_REQUEST_MUTATION = gql`
  mutation CreateRequest($calendarId: String!, $userId: String!) {
    createRequest(calendarId: $calendarId, userId: $userId) {
      id
      calendarId
      userId
      yearOfStudy
      email
      message
    }
  }
`;
