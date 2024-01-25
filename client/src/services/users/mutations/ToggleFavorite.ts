import { gql } from '@apollo/client';

export const TOGGLE_FAVORITE_MUTATION = gql`
  mutation ToggleFavorite($userId: ID!, $articleId: ID!, $isFavorite: Boolean!) {
    toggleFavorite(userId: $userId, articleId: $articleId, isFavorite: $isFavorite) {
      message
      favorites
    }
  }
`;
