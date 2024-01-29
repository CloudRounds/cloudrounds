export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  password?: string;
  email: string;
  university: string;
  isAdmin: boolean;
  calendars: Calendar[];
  canReadCalendars: Calendar[];
  canWriteCalendars: Calendar[];
  organizedArticles: Article[];
  favorites: Favorite[];
  resetToken?: string;
  resetTokenExpiry?: Date;
  registerToken?: string;
  registerTokenExpiry?: Date;
  emailValidated: boolean;
  feedbacks: Feedback[];
  requests: Request[];
  attended: Article[];
  createdAt: Date;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface Feedback {
  id: string;
  articleId: string;
  article: Article;
  userId: string;
  user: User;
  feedback: string;
  createdAt: Date;
}

export interface Favorite {
  id: string;
  userId: string;
  user: User;
  articleId: string;
  article: Article;
  createdAt: Date;
}

export interface Invite {
  id: string;
  email: string;
  calendarId: string;
  calendarName: string;
  token: string;
  expirationTime: Date;
  createdAt: Date;
  creator?: string;
  calendar: Calendar;
}

export interface Request {
  id: string;
  calendarId: string;
  calendar?: Calendar;
  userId: string;
  user?: User;
  yearOfStudy?: string;
  status: string;
  message?: string;
  email?: string;
  createdAt: Date;
}

export interface EmailMember {
  id: string;
  email: string;
  calendarId: string;
  calendar?: Calendar;
  createdAt?: Date;
}

export interface CalendarMember {
  id: string;
  email: string;
  calendarId?: string;
  username?: string;
  userId?: string;
  calendar?: Calendar;
  createdAt?: Date;
}

export interface Calendar {
  id: string;
  name: string;
  description?: string;
  creatorId: string;
  createdAt?: Date;
  creator?: User;
  canReadMembers: User[];
  canWriteMembers: User[];
  articles: Article[];
  invites: Invite[];
  requests: Request[];
  emailMembers: EmailMember[];
}

export interface BaseArticle {
  title: string;
  eventLink: string;
  date: Date;
  duration: string;
  organizerId: string;
  calendarId: string;
  meetingType?: string;
  meetingId?: string;
  passcode?: string;
  speaker?: string;
  location?: string;
  additionalDetails?: string;
}

export interface Article extends BaseArticle {
  id: string;
  organizer?: User;
  calendar?: Calendar;
  favorites?: Favorite[];
  attendees?: User[];
  createdAt?: Date;
  feedbacks?: Feedback[];
}

// Omit id types for creating new records
export type CreateArticleInput = Omit<Article, 'id' | 'organizer' | 'calendar' | 'favorites' | 'attendees' | 'createdAt' | 'feedbacks'>;
export type CreateRequestInput = Omit<Request, 'id' | 'calendar' | 'user' | 'createdAt'>;
export type CreateInviteInput = Omit<Invite, 'id' | 'token' | 'createdAt' | 'calendar'>;
export type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'isAdmin'> & {
  password: string;
};
export type InitialUserData = Omit<User, 'id' | 'createdAt' | 'isAdmin' | 'password' | 'attended' | 'favorites' | 'feedbacks' | 'calendars' | 'emailValidated' | 'requests' | 'organizedArticles'>;

export type CreateCalendarInput = Omit<Calendar, 'id' | 'createdAt' | 'creator'> & {
  creatorId: string;
};

export type CreateEmailMember = Omit<EmailMember, 'id'>;


export interface TempUserValues {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  canReadCalendars: string[];
  canWriteCalendars: string[];
  university: string;
  password?: string;
}

export interface UserStringValues {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  password?: string;
}

export interface UpdateCalendarMutationArgs {
  calendarId: string;
  editedCalendar: CreateCalendarInput;
}