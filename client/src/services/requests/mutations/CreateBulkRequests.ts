import gql from 'graphql-tag';

export const CREATE_BULK_REQUESTS_MUTATION = gql`
  mutation CreateBulkRequests($userIds: [ID!]!, $purposeId: ID!) {
    createBulkRequests(userIds: $userIds, purposeId: $purposeId) {
      requests {
        id
        user {
          id
          username
          email
        }
        purpose {
          id
          name
        }
        status
      }
    }
  }
`;
