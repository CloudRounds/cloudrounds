import { gql } from '@apollo/client';

export const FETCH_INVITE_BY_TOKEN_QUERY = gql`
  query Invite($token: String!) {
    invite(token: $token) {
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
