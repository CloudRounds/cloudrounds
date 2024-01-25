import { gql } from '@apollo/client';

export const FETCH_FEEDBACKS_QUERY = gql`
  query FetchFeedbacks {
    feedbacks {
      id
      feedback
      userId
      articleId
    }
  }
`;
