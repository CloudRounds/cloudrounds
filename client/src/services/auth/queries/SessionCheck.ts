import { gql } from '@apollo/client';

export const SESSION_CHECK_QUERY = gql`
  query SessionCheck {
    sessionCheck {
      valid
      user
    }
  }
`;
