import { Article, Calendar, InitialUserData, User } from '@/types';

export const INITIAL_ARTICLE_DATA: Partial<Article> = {
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
};

export const INITIAL_CALENDAR_DATA: Partial<Calendar> = {
  name: '',
  description: '',
  creatorId: '',
};

export const INITIAL_USER_DATA: Partial<User> = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  university: '',
};