import { gql } from '@apollo/client';

export const DELETE_ARTICLE_MUTATION = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id) {
      message
    }
  }
`;

