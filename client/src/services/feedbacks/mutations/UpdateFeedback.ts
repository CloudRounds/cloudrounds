import { gql } from '@apollo/client';

export const UPDATE_FEEDBACK_MUTATION = gql`
  mutation UpdateFeedback($feedbackId: String!, $feedback: String!) {
    updateFeedback(feedbackId: $feedbackId, feedback: $feedback) {
      id
      feedback
    }
  }
`;
