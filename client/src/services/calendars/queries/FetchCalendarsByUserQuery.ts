import { gql } from '@apollo/client';

export const FETCH_CALENDARS_BY_USER_QUERY = gql`
  query Calendars($userId: String) {
    calendars(userId: $userId) {
      id
      name
      description
      creatorId
      canReadMembers {
        id
      }
      canWriteMembers {
        id
      }
      articles {
        id
      }
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

