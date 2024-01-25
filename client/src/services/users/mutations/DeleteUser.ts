import { gql } from '@apollo/client';

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      message
    }
  }
`;
