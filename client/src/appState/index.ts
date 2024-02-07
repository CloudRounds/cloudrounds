import { Article, Calendar, Feedback, Request, Schedule, ScheduleEvent, User } from '@/types';
import { atom, selector } from 'recoil';
import { INITIAL_ARTICLE_DATA, INITIAL_CALENDAR_DATA } from './initialStates';

export const defaultArticleValue = (id: string) => {
  return { ...INITIAL_ARTICLE_DATA, id };
};

export const defaultCalendarValue = (id: string) => {
  return { ...INITIAL_CALENDAR_DATA, id };
};

export const authState = atom<{
  isLoggedIn: boolean;
  userData: User | null;
}>({
  key: 'authState',
  default: {
    isLoggedIn: false,
    userData: null,
  },
});


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

export const userRequestsState = atom<Request[]>({
  key: 'userRequestsState',
  default: [],
});

export const feedbacksState = atom<Feedback[]>({
  key: 'feedbacksState',
  default: [],
});

export const favoritesState = atom<Article[] | null>({
  key: 'favoritesState',
  default: null,
});

export const attendedState = atom<Article[] | null>({
  key: 'attendedState',
  default: null,
});

export const schedulesState = atom<Schedule[] | null>({
  key: 'schedulesState',
  default: null,
});

export const scheduleEventsState = atom<ScheduleEvent[] | null>({
  key: 'scheduleEventsState',
  default: null,
});

export const schedulesRefetchTrigger = atom({
  key: 'schedulesRefetchTrigger',
  default: 0,
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

// export const attendedState = atomFamily<Article, string>({
//   key: 'attendedState',
//   default: (id) => defaultArticleValue(id),
// });
