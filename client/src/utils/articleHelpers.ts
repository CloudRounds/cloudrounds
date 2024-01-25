import { Article, Calendar } from '@/types';

export const getEmptyCalendars = (localArticles: Article[], userCalendarObjects: Calendar[]) => {
  const articleCalendars = localArticles.map(a => a.calendar.name);
  const userCalendarNames = userCalendarObjects.map(p => p.name);
  const emptyCalendars = userCalendarNames.filter(p => !articleCalendars.includes(p));
  return emptyCalendars;
};

export const getCalendarsAfterUpdate = (
  articles: Article[] | Article[],
  calendars: Calendar[],
  updatedArticle: Article | Article,
  updatedArticles: Article[] | Article[],
  selectedCalendars: string[]
): string[] => {

  const getArticleCalendarName = (article: Article) => {
    return typeof article.calendar === 'string' ? article.calendar : article.calendar.name;
  };

  const oldCalendarName = articles.find(a => a.id === updatedArticle.id)?.calendar.name;
  const newCalendarName = calendars.find(c => updatedArticle.calendar.id === c.id)?.name;


  const oldCalendarStillInUse = updatedArticles.some(article => getArticleCalendarName(article) === oldCalendarName);
  let newSelectedCalendars = selectedCalendars.slice();

  if (oldCalendarName && !oldCalendarStillInUse && newSelectedCalendars.includes(oldCalendarName)) {
    newSelectedCalendars = newSelectedCalendars.filter(calendar => calendar !== oldCalendarName);
  }

  if (newCalendarName && !newSelectedCalendars.includes(newCalendarName)) {
    newSelectedCalendars.push(newCalendarName);
  }

  return newSelectedCalendars;
};


export const getCalendarsAfterCreate = (
  calendars: Calendar[],
  newArticle: Article,
  selectedCalendars: string[]
): string[] => {
  let newSelectedCalendars = selectedCalendars.slice();
  const newCalendarId = typeof newArticle.calendar === 'string' ? newArticle.calendar : newArticle.calendar.id;
  const newCalendarName = calendars.find(p => p.id === newCalendarId)?.name;

  if (newCalendarName && !newSelectedCalendars.includes(newCalendarName)) {
    newSelectedCalendars.push(newCalendarName);
  }

  return newSelectedCalendars;
};

export const getCalendarsAfterDelete = (
  articles: Article[],
  deletedArticle: Article,
  selectedCalendars: string[]
): string[] => {
  const deletedArticleCalendarId = typeof deletedArticle.calendar === 'string'
    ? deletedArticle.calendar
    : deletedArticle.calendar.id;

  const isCalendarStillUsed = articles.some(article => {
    const articleCalendarId = typeof article.calendar === 'string' ? article.calendar : article.calendar.id;
    return articleCalendarId === deletedArticleCalendarId && article.id !== deletedArticle.id;
  });

  if (!isCalendarStillUsed) {
    const deletedArticleCalendarName = typeof deletedArticle.calendar === 'string'
      ? deletedArticle.calendar
      : deletedArticle.calendar.name;

    return selectedCalendars.filter(calendarName => calendarName !== deletedArticleCalendarName);
  }

  return selectedCalendars;
};


export const isArticleAfterCurrentDate = (article: Article) => {
  const currentDate = new Date();
  const startOfCurrentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

  const articleDate = new Date(article ? article.date : '');

  // Check if the article date is on or after the start of the current day
  return articleDate >= startOfCurrentDay;
};

export const filterArticlesForList = (
  localArticles: Article[],
  organizerFilter: string[],
  selectedCalendars: string[]
): Article[] => {
  return localArticles
    .filter(article => {
      const organizerUsername = typeof article.organizer === 'string' ? article.organizer : article.organizer?.username;
      if (organizerUsername) {
        return organizerFilter.includes(organizerUsername)
      } else {
        return organizerFilter.length === 0;
      }
    })
    .filter(article => {
      const calendarName = typeof article.calendar === 'string' ? article.calendar : article.calendar.name;
      return selectedCalendars.includes('Show All') || selectedCalendars.includes(calendarName);
    })
    .filter(isArticleAfterCurrentDate);
};


export const getArticlesForPage = (
  currentPage: number,
  articlesPerPage: number,
  filteredArticles: Article[]
): Article[] => {
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  return filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
};
