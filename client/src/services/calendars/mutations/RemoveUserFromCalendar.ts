import { gql } from '@apollo/client';

export const REMOVE_USER_FROM_CALENDAR_MUTATION = gql`
  mutation RemoveUserFromCalendar($userId: String!, $calendarId: String!) {
    removeUserFromCalendar(userId: $userId, calendarId: $calendarId) {
      message
    }
  }
`;
