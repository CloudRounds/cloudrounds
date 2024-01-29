import { useResetRecoilState } from 'recoil';
import { articlesState, calendarsState, userRequestsState, feedbacksState, favoritesState, userState, requestsFetchedState, usersFetchedState } from '@/appState';

export const useResetAppState = () => {
  const resetUser = useResetRecoilState(userState);
  const resetArticles = useResetRecoilState(articlesState);
  const resetCalendars = useResetRecoilState(calendarsState);
  const resetUserRequests = useResetRecoilState(userRequestsState);
  const resetFeedbacks = useResetRecoilState(feedbacksState);
  const resetFavorites = useResetRecoilState(favoritesState);
  const resetFetchedRequestsState = useResetRecoilState(requestsFetchedState);
  const resetFetchedUsersState = useResetRecoilState(usersFetchedState);


  const resetAll = () => {
    resetUser();
    resetArticles();
    resetCalendars();
    resetUserRequests();
    resetFeedbacks();
    resetFavorites();
    resetFetchedRequestsState();
    resetFetchedUsersState();
    localStorage.removeItem('CloudRoundsToken');
    localStorage.removeItem('CloudRoundsUser');
  };

  return resetAll;
};
