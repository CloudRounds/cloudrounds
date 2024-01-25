import { gql } from '@apollo/client';

export const FETCH_FAVORITES_QUERY = gql`
  query Favorites($userId: ID!) {
    favorites(userId: $userId) {
      id
      userId
      articleId
    }
  }
`;
