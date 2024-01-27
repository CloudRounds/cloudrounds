import { gql } from '@apollo/client';

export const FETCH_USERS_QUERY = gql`
  query Users {
    users {
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
        id
        name
        description
        creatorId
      }
      canWriteCalendars {
        id
        name
        description
        creatorId
      }
      organizedArticles {
        id
      }
      favorites {
        id
        userId
        articleId
      }
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
    }
  }
`;