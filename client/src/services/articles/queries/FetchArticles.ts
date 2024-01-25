import { gql } from '@apollo/client';

export const ARTICLES_QUERY = gql`
  query articles {
    articles {
      id
      title
      eventLink
      date
      duration
      calendarId
      calendar {
        name
        description
        creatorId
        creator
        canReadMembers {
          id
        }
        canWriteMembers {
          id
        }
      }
      meetingType
      meetingId
      passcode
      speaker
      location
      additionalDetails
      feedbacks {
        id
        feedback
        userId
        articleId
      }
      attendees {
        id
        userId
      }
      favorites {
        id
        userId
        articleId
      }
      organizerId
      organizer {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

