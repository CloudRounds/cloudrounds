import { gql } from '@apollo/client';

export const DELETE_CALENDAR_MUTATION = gql`
  mutation DeleteCalendar($calendarId: String!) {
    deleteCalendar(calendarId: $calendarId) {
      id
    }
  }
`;