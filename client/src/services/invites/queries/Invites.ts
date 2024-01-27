import { gql } from '@apollo/client';

export const FETCH_ALL_INVITES_QUERY = gql`
  query Invites {
    invites {
      id
      email
      calendarId
      calendarName
      token
      expirationTime
      createdAt
      creator
    }
  }
`;
