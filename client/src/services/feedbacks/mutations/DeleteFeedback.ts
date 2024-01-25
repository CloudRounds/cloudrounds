import { gql } from '@apollo/client';

export const DELETE_FEEDBACK_MUTATION = gql`
  mutation DeleteFeedback($feedbackId: String!) {
    deleteFeedback(feedbackId: $feedbackId) {
      message
    }
  }
`;
