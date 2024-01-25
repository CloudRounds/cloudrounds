import { gql } from '@apollo/client';

export const CREATE_FEEDBACK_MUTATION = gql`
  mutation CreateFeedback($feedbackInput: FeedbackInput!) {
    createFeedback(feedbackInput: $feedbackInput) {
      articleId
      userId
      feedback
    }
  }
`;
