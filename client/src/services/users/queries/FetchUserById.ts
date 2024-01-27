import { gql } from '@apollo/client';

export const FETCH_USER_BY_ID_QUERY = gql`
  query UserById($userId: ID!) {
    userById(userId: $userId) {
      id
      username
      firstName
      lastName
      email
      university
      isAdmin
      createdCalendars {
        name
        description
        creatorId
        canReadMembers {
          id
        }
        canWriteMembers {
          id
        }
      }
      canReadCalendars {
        name
        description
        creatorId
        canReadMembers {
          id
        }
        canWriteMembers {
          id
        }
      }
      canWriteCalendars {
        name
        description
        creatorId
        canReadMembers {
          id
        }
        canWriteMembers {
          id
        }
      }
      organizedArticles {
        id
      }
      favorites {
        id
        userId
        articleId
      }
      registerToken
      registerTokenExpiry
      emailValidated
      feedbacks {
        id
        feedback
        userId
        articleId
      }
      requests {
        id
        userId
        calendarId
        status
        message
        yearOfStudy
        email
      }
      attended {
        id
        title
      }
    }
  }
`;
