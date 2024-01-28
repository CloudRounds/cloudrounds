import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchArticles } from '@/services/ArticleService';
import { fetchCalendars } from '@/services/CalendarService';
import { User, Article, Calendar } from '@/types';

const useArticlePermissions = () => {
  const [allowedArticles, setAllowedArticles] = useState<Article[]>([]);
  const [allowedCalendars, setAllowedCalendars] = useState<string[]>([]);
  const [canReadCalendars, setCanReadCalendars] = useState<Calendar[]>([]);
  const [canWriteCalendars, setCanWriteCalendars] = useState<Calendar[]>([]);

  const localUser = localStorage.getItem('CloudRoundsUser');
  const user = localUser ? JSON.parse(localUser) as User : null;

  const {
    data: articles,
    isLoading: isArticlesLoading
  } = useQuery<Article[], Error>('articles', fetchArticles);

  const {
    data: calendars,
    isLoading: isCalendarsLoading
  } = useQuery<Calendar[], Error>(['usercalendars', user?.id], () => fetchCalendars(user?.id || ''), {
    enabled: !!user
  });

  useEffect(() => {
    if (isArticlesLoading || isCalendarsLoading || !articles || !calendars || !user) {
      return;
    }

    const calendarIds = calendars.map(p => ({
      id: p.id,
      canReadMembers: p.canReadMembers.map(m => m.id),
      canWriteMembers: p.canWriteMembers.map(m => m.id)
    }));

    const canReadArticles = articles.filter(article => {
      const calendarId = article.calendar.id;
      return calendarId && calendarIds.some(p => p.id === calendarId && p.canReadMembers.includes(user.id));
    });

    const canWriteArticles = articles.filter(article => {
      const calendarId = typeof article.calendar === 'string' ? article.calendar : article.calendar.id;
      return calendarId && calendarIds.some(p => p.id === calendarId && p.canWriteMembers.includes(user.id));
    });

    setCanReadCalendars(
      calendars.filter(p => canReadArticles.some(article => {
        const calendarId = article.calendar.id;
        return calendarId && calendarId === p.id;
      }))
    );

    setCanWriteCalendars(
      calendars.filter(p => canWriteArticles.some(article => {
        const calendarId = article.calendar.id;
        return calendarId && calendarId === p.id;
      }))
    );

    const calendarNames = calendars.map(p => p.name);
    setAllowedCalendars(calendarNames);
    setAllowedArticles(canReadArticles);
  }, [isArticlesLoading, isCalendarsLoading, articles, calendars, user]);


  return {
    allowedArticles,
    allowedCalendars,
    userCalendars: calendars,
    canReadCalendars,
    canWriteCalendars,
    isLoading: isArticlesLoading || isCalendarsLoading
  };
};

export default useArticlePermissions;
