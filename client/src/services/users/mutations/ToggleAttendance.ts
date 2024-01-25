import { gql } from '@apollo/client';

export const TOGGLE_ATTENDANCE_MUTATION = gql`
  mutation ToggleAttendance($userId: ID!, $articleId: ID!, $isAttending: Boolean!) {
    toggleAttendance(userId: $userId, articleId: $articleId, isAttending: $isAttending) {
      message
      attended
    }
  }
`;
