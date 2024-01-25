import { gql } from '@apollo/client';

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $updates: UserUpdateInput!) {
    updateUser(id: $id, updates: $updates) {
      id
      // other fields
    }
  }
`;