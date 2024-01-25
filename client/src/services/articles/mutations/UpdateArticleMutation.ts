import { gql } from '@apollo/client';

export const UPDATE_ARTICLE_MUTATION = gql`
  mutation UpdateArticle($id: ID!, $articleInput: ArticleCreateInput!) {
    updateArticle(id: $id, articleInput: $articleInput) {
      id
      title
      eventLink
      date
      duration
      organizerId
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
      purposeId
      organizerId
    }
  }
`;