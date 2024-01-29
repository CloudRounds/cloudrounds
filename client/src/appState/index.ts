import { Article, Calendar, Favorite, Feedback, Request, User } from '@/types';
import { atom, atomFamily, selector } from 'recoil';
import { INITIAL_ARTICLE_DATA, INITIAL_CALENDAR_DATA } from './initialStates';

export const defaultArticleValue = (id: string) => {
  return { ...INITIAL_ARTICLE_DATA, id };
};

export const defaultCalendarValue = (id: string) => {
  return { ...INITIAL_CALENDAR_DATA, id };
};

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export const usersState = atom<User[]>({
  key: 'usersState',
  default: [],
});

export const articlesState = atom<Article[]>({
  key: 'articlesState',
  default: [],
});

export const calendarsState = atom<Calendar[]>({
  key: 'calendarsState',
  default: [],
});

export const requestsState = atom<Request[]>({
  key: 'requestsState',
  default: [],
});

export const requestsFetchedState = atom<boolean>({
  key: 'requestsFetchedState',
  default: false
});

export const usersFetchedState = atom<boolean>({
  key: 'usersFetchedState',
  default: false
});



export const submittedRequestsState = atom<Request[]>({
  key: 'submittedRequestsState',
  default: [],
});

export const feedbacksState = atom<Feedback[]>({
  key: 'feedbacksState',
  default: [],
});

export const favoritesState = atom<Favorite[]>({
  key: 'favoritesState',
  default: [],
});

export const canReadCalendarsState = selector({
  key: 'canReadCalendarsState',
  get: ({ get }) => {
    const calendars = get(calendarsState);
    const user = get(userState);

    if (!user || !calendars) return [];

    return calendars.filter(cal =>
      cal.canReadMembers?.some(member => member.id === user.id)
    );
  },
});

export const canWriteCalendarsState = selector({
  key: 'canWriteCalendarsState',
  get: ({ get }) => {
    const calendars = get(calendarsState);
    const user = get(userState);

    if (!user || !calendars) return [];

    return calendars.filter(cal =>
      cal.canWriteMembers?.some(member => member.id === user.id)
    );
  },
});

export const attendedState = atomFamily<Article, string>({
  key: 'attendedState',
  default: (id) => defaultArticleValue(id),
});
