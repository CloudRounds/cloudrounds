import { Article, Calendar, CreateArticleInput, CreateCalendarInput, InitialUserData } from '@/types';

export const INITIAL_ARTICLE_DATA: CreateArticleInput | Article = {
  title: '',
  eventLink: '',
  date: new Date(),
  duration: '',
  meetingId: '',
  passcode: '',
  speaker: '',
  additionalDetails: '',
  location: '',
  meetingType: 'Virtual',
  calendarId: '',
  organizerId: '',
  attendees: [],
  favorites: [],
  feedbacks: [],
};

export const INITIAL_CALENDAR_DATA: CreateCalendarInput | Calendar = {
  name: '',
  description: '',
  creatorId: '',
  canReadMembers: [],
  canWriteMembers: [],
  articles: [],
  emailMembers: [],
  invites: [],
  requests: []
};

export const INITIAL_USER_DATA: InitialUserData = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  university: '',
  canReadCalendars: [],
  canWriteCalendars: [],
};