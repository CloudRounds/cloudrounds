import { gql } from '@apollo/client';

export const UPDATE_CALENDAR_MUTATION = gql`
  mutation UpdateCalendar($calendarId: String!, $calendarInput: CalendarUpdateInput!) {
    updateCalendar(calendarId: $calendarId, calendarInput: $editedCalendar) {
      id
      name
      description
      creatorId
      canReadMembers {
        id
      }
      canWriteMembers {
        id
      }
      articles {
        id
      }
      invites
      requests {
        id
        userId
        status
      }
      emailMembers {
        id
        email
      }
    }
  }
`;