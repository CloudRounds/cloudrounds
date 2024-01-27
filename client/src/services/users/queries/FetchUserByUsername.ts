import { gql } from '@apollo/client';

export const FETCH_USER_BY_USERNAME_QUERY = gql`
  query UserByUsername($username: String!) {
    userByUsername(username: $username) {
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

