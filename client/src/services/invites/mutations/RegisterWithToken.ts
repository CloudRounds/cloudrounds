import { gql } from '@apollo/client';

export const REGISTER_WITH_TOKEN_MUTATION = gql`
  mutation RegisterWithToken(
    $token: String!,
    $username: String!,
    $email: String!,
    $password: String!,
    $university: String!,
    $firstName: String!,
    $lastName: String!
  ) {
    registerWithToken(
      token: $token,
      username: $username,
      email: $email,
      password: $password,
      university: $university,
      firstName: $firstName,
      lastName: $lastName
    ) {
      message
      token
      user {
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
  }
`;
