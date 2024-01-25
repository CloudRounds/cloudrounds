import { gql } from '@apollo/client';

export const DELETE_REQUEST_MUTATION = gql`
  mutation DeleteRequest($requestId: ID!) {
    deleteRequest(requestId: $requestId) {
      message
    }
  }
`;
