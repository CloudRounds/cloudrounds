import apiClient from '@/utils/apiClient';

export const createFeedback = async (userId: string, feedback: string, articleId: string) => {
  try {
    const response = await apiClient.post('/feedbacks', { userId, feedback, articleId });
    return response.data;
  } catch (error) {
    console.error('Error creating feedback:', error);
  }
};

export const updateFeedback = async (feedbackId: string, feedback: string) => {
  try {
    const response = await apiClient.put(`/feedbacks/${feedbackId}`, { feedback });
    return response.data;
  } catch (error) {
    console.error('Error updating feedback:', error);
  }
};

export const deleteFeedback = async (feedbackId: string) => {
  try {
    const response = await apiClient.delete(`/feedbacks/${feedbackId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting feedback:', error);
  }
};

export const fetchUserFeedbacks = async (userId: string) => {
  try {
    const response = await apiClient.get(`/feedbacks/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user feedbacks:', error);
  }
};


export const fetchFeedbacks = async () => {
  try {
    const response = await apiClient.get('/feedbacks');
    return response.data;
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
  }
};