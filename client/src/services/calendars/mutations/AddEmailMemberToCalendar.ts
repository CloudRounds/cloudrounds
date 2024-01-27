import { gql } from '@apollo/client';

export const ADD_EMAIL_MEMBER_MUTATION = gql`
  mutation AddEmailMemberToCalendar($calendarId: String!, $email: String!) {
    addEmailMemberToCalendar(calendarId: $calendarId, email: $email) {
      id
      name
      emailMembers {
        email
      }
    }
  }
`;


