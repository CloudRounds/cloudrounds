import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation RegisterUser($userData: UserData!) {
    registerUser(userData: $userData) {
      id
      // other fields
    }
  }
`;
