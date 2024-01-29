import { useQuery } from 'react-query';
import { fetchArticles } from '@/services/ArticleService';
import { fetchCalendars } from '@/services/CalendarService';
import { User, Article } from '@/types';
import { useRecoilState, useRecoilValue } from 'recoil';
import { articlesState, calendarsState, canReadCalendarsState, canWriteCalendarsState } from '@/appState';

const useArticlePermissions = () => {
  const [articles, setArticles] = useRecoilState(articlesState);
  const [calendars, setCalendars] = useRecoilState(calendarsState);
  const canReadCalendars = useRecoilValue(canReadCalendarsState);
  const canWriteCalendars = useRecoilValue(canWriteCalendarsState);

  const localUser = localStorage.getItem('CloudRoundsUser');
  const user = localUser ? JSON.parse(localUser) as User : null;

  const { isLoading: isArticlesLoading } = useQuery<Article[], Error>('articles', fetchArticles, {
    onSuccess: (data) => {
      // console.log('Articles fetched successfully:', data);
      setArticles(data);
    },
    onError: (error) => {
      console.error('Error fetching articles:', error);
    },
  });

  const { isLoading: isCalendarsLoading } = useQuery(['UserCalendars', user?.id], () => fetchCalendars(user?.id), {
    enabled: !!user,
    onSuccess: (data) => {
      // console.log('Calendars fetched successfully:', data);
      setCalendars(data);
    },
    onError: (error) => {
      console.error('Error fetching calendars:', error);
    },
  });

  const allowedCalendars = calendars.map(c => c.name);
  const allowedArticles = articles;


  return {
    allowedArticles,
    allowedCalendars,
    userCalendars: calendars,
    canReadCalendars,
    canWriteCalendars,
    isArticlesLoading: isArticlesLoading,
    isCalendarsLoading: isCalendarsLoading
  };
};

export default useArticlePermissions;
