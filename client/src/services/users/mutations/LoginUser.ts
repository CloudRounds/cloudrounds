import { gql } from '@apollo/client';

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(credential: $username, password: $password) {
      token
      user {
        id
        // other fields
      }
    }
  }
`;