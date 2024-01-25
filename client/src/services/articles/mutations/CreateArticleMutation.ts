import { gql } from '@apollo/client';

export const CREATE_ARTICLE_MUTATION = gql`
  mutation CreateArticle($id: ID!, $articleInput: ArticleCreateInput!) {
    createArticle(id: $id, articleInput: $articleInput) {
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