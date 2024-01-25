import { gql } from '@apollo/client';

export const FETCH_USERS_QUERY = gql`
  query Users {
    users {
      id
      username
      firstName
      lastName
      password
      email
      university
      isAdmin
      createdCalendars {
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
      }
      canReadCalendars {
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
      }
      canWriteCalendars {
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
        articleId
      }
    }
  }
`;