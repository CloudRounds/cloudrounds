import userStore from '@/stores/userStore';
import { Article, CreateArticleInput } from '@/types';
import apiClient from '@/utils/apiClient';
import { compareDates } from '@/utils/dates';

export const fetchArticles = async () => {
  try {
    const response = await apiClient.get('/articles');
    userStore.setArticles(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};

export const updateArticle = async (editedArticle: Article) => {
  try {
    const response = await apiClient.put(`/articles/${editedArticle.id}`, editedArticle);
    return response.data;
  } catch (error) {
    console.error('Error updating article:', error);
  }
};

export const createArticle = async (article: CreateArticleInput) => {
  try {
    const response = await apiClient.post('/articles/new', article);
    console.log('Article created:', response.data);
    return response.data;
  } catch (error) {
    console.error('There was an error creating the article:', error);
  }
};

export const deleteArticle = async (articleId: string) => {
  try {
    await apiClient.delete(`/articles/${articleId}`);
    // if needed – update the userStore state after deletion
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
