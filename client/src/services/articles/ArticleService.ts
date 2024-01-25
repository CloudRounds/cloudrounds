import userStore from '@/stores/userStore';
import { compareDates } from '@/utils/dates';
import { Article, ArticleCreateInput } from '@/types';
import { client } from '@/utils/apolloClient';
import { ARTICLES_QUERY } from './queries/FetchArticles';
import { UPDATE_ARTICLE_MUTATION } from './mutations/UpdateArticleMutation';
import { DELETE_ARTICLE_MUTATION } from './mutations/DeleteArticleMutation';
import { CREATE_ARTICLE_MUTATION } from './mutations/CreateArticleMutation';

export const updateArticle = async (editedArticle: Article) => {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_ARTICLE_MUTATION,
      variables: { id: editedArticle.id, articleInput: editedArticle },
    });
    return data.updateArticle;
  } catch (error) {
    console.error('Error updating article:', error);
  }
};


export const createArticle = async (article: ArticleCreateInput) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_ARTICLE_MUTATION,
      variables: { articleInput: article },
    });
    console.log('Article created:', data.createArticle);
    return data.createArticle;
  } catch (error) {
    console.error('There was an error creating the article:', error);
  }
};


export const deleteArticle = async (articleId: string) => {
  try {
    await client.mutate({
      mutation: DELETE_ARTICLE_MUTATION,
      variables: { id: articleId },
    });
    // If needed – update the userStore state after deletion
    // userStore.setArticles(userStore.articles.filter(article => article.id !== articleId));
  } catch (error) {
    console.error('Error deleting article:', error);
  }
};


export const sortArticles = (articles: Article[]) => {
  return articles.sort(compareDates);
};

export const sortArticlesDescending = (articles: Article[]) => {
  return articles.sort((a, b) => {
    return compareDates(b, a);
  });
};

export const fetchArticles = async () => {
  try {
    const { data } = await client.query({ query: ARTICLES_QUERY });
    userStore.setArticles(data.articles);
    return data.articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};
