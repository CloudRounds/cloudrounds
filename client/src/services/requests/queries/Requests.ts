import { gql } from '@apollo/client';

export const FETCH_REQUESTS_QUERY = gql`
  query FetchRequests {
    requests {
      id
      status
      calendarId
      userId
      yearOfStudy
      email
      message
    }
  }
`;
