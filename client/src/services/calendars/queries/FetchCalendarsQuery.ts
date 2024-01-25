import { gql } from '@apollo/client';

export const FETCH_CALENDARS_QUERY = gql`
  query Calendars($userId: String) {
    calendars(userId: $userId) {
      id
      name
      description
      creatorId
      creator
      canReadMembers {
        id
      }
      canWriteMembers {
        id
      }
      articles {
        id
      }
      invites
      requests {
        id
        userId
        status
      }
      emailMembers {
        id
        email
      }
    }
  }
`;

