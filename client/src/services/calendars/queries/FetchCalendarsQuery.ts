import { gql } from '@apollo/client';

export const FETCH_CALENDARS_QUERY = gql`
  query Calendars {
    calendars {
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

