import { CREATE_FEEDBACK_MUTATION } from './mutations/CreateFeedback';
import { UPDATE_FEEDBACK_MUTATION } from './mutations/UpdateFeedback';
import { DELETE_FEEDBACK_MUTATION } from './mutations/DeleteFeedback';
import { FETCH_FEEDBACKS_QUERY } from './queries/FetchFeedbacks';
import { Feedback } from '@/types';
import { client } from '@/utils/apolloClient';
import { FETCH_USER_FEEDBACKS_QUERY } from './queries/FetchUserFeedbacks';


export const updateFeedback = async (editedFeedback: Feedback) => {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_FEEDBACK_MUTATION,
      variables: { feedbackId: editedFeedback.id, feedback: editedFeedback.feedback },
    });
    return data.updateFeedback;
  } catch (error) {
    console.error('Error updating feedback:', error);
  }
};

export const createFeedback = async (userId: string, feedback: string, articleId: string) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_FEEDBACK_MUTATION,
      variables: { feedbackInput: { userId, feedback, articleId } },
    });
    return data.createFeedback;
  } catch (error) {
    console.error('There was an error creating the feedback:', error);
  }
};

export const deleteFeedback = async (feedbackId: string) => {
  try {
    await client.mutate({
      mutation: DELETE_FEEDBACK_MUTATION,
      variables: { feedbackId },
    });
  } catch (error) {
    console.error('Error deleting feedback:', error);
  }
};

export const fetchUserFeedbacks = async (userId: string) => {
  try {
    const { data } = await client.query({
      query: FETCH_USER_FEEDBACKS_QUERY,
      variables: { userId },
    });
    return data.feedbacks; // Assuming it returns an array of feedbacks
  } catch (error) {
    console.error('Error fetching user feedbacks:', error);
  }
};

export const fetchFeedbacks = async () => {
  try {
    const { data } = await client.query({
      query: FETCH_FEEDBACKS_QUERY,
    });
    return data.feedbacks;
  } catch (error) {
    console.error('Error fetching all feedbacks:', error);
  }
};