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
        // Add other user fields as necessary
      }
    }
  }
`;
