import { gql } from '@apollo/client';

export const CREATE_CALENDAR_MUTATION = gql`
  mutation CreateCalendar($calendarInput: CalendarCreateInput!) {
    createCalendar(calendar: $calendarInput) {
      id
      name
      description
      creatorId
    }
  }
`;

