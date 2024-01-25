import { gql } from '@apollo/client';

export const FETCH_USER_FEEDBACKS_QUERY = gql`
  query FetchUserFeedbacks($userId: String!) {
    feedbacksByUser(userId: $userId) {
      id
      feedback
      articleId
      user {
        id
        email
        firstName
        lastName
      }
      article {
        id
      }
    }
  }
`;
