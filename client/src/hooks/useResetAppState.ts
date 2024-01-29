import { useResetRecoilState } from 'recoil';
import { articlesState, calendarsState, submittedRequestsState, feedbacksState, favoritesState, userState } from '@/appState';

export const useResetAppState = () => {
  const resetUser = useResetRecoilState(userState);
  const resetArticles = useResetRecoilState(articlesState);
  const resetCalendars = useResetRecoilState(calendarsState);
  const resetSubmittedRequests = useResetRecoilState(submittedRequestsState);
  const resetFeedbacks = useResetRecoilState(feedbacksState);
  const resetFavorites = useResetRecoilState(favoritesState);

  const resetAll = () => {
    resetUser();
    resetArticles();
    resetCalendars();
    resetSubmittedRequests();
    resetFeedbacks();
    resetFavorites();
    localStorage.removeItem('CloudRoundsToken');
    localStorage.removeItem('CloudRoundsUser');
  };

  return resetAll;
};
