import { gql } from '@apollo/client';

export const DELETE_INVITE_BY_TOKEN_MUTATION = gql`
  mutation DeleteInvite($token: String!) {
    deleteInvite(token: $token) {
      message
    }
  }
`;
