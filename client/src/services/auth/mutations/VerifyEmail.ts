import { gql } from '@apollo/client';

export const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token) {
      message
    }
  }
`;
