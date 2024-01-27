import { gql } from '@apollo/client';

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $updates: UserUpdateInput!) {
    updateUser(id: $id, updates: $updates) {
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