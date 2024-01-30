import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AddEmailMemberToCalendarInput = {
  calendarId: Scalars['ID']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
};

export type AddEmailMemberToCalendarPayload = {
  __typename?: 'AddEmailMemberToCalendarPayload';
  calendar?: Maybe<Calendar>;
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

export type AddFavoriteInput = {
  articleId: Scalars['ID']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};

export type AddFavoritePayload = {
  __typename?: 'AddFavoritePayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  favorite?: Maybe<Favorite>;
};

export type Article = Node & {
  __typename?: 'Article';
  additionalDetails?: Maybe<Scalars['String']['output']>;
  attendees: Array<User>;
  calendar: Calendar;
  calendarId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  duration?: Maybe<Scalars['String']['output']>;
  eventLink?: Maybe<Scalars['String']['output']>;
  favorites: Array<Favorite>;
  feedbacks: Array<Feedback>;
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  meetingId?: Maybe<Scalars['String']['output']>;
  meetingType?: Maybe<Scalars['String']['output']>;
  organizer: User;
  organizerId: Scalars['String']['output'];
  passcode?: Maybe<Scalars['String']['output']>;
  speaker?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type ArticleConnection = {
  __typename?: 'ArticleConnection';
  edges?: Maybe<Array<Maybe<ArticleEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type ArticleEdge = {
  __typename?: 'ArticleEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Article>;
};

export type Calendar = Node & {
  __typename?: 'Calendar';
  articles?: Maybe<ArticleConnection>;
  canReadMembers?: Maybe<Array<Maybe<User>>>;
  canWriteMembers?: Maybe<Array<Maybe<User>>>;
  createdAt: Scalars['DateTime']['output'];
  creator?: Maybe<User>;
  creatorId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emailMembers?: Maybe<Array<Maybe<EmailMember>>>;
  id: Scalars['ID']['output'];
  invites?: Maybe<Array<Maybe<Invite>>>;
  name: Scalars['String']['output'];
  requests?: Maybe<Array<Maybe<Request>>>;
};

export type CalendarConnection = {
  __typename?: 'CalendarConnection';
  edges?: Maybe<Array<Maybe<CalendarEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type CalendarEdge = {
  __typename?: 'CalendarEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Calendar>;
};

export type ChangePasswordInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type ChangePasswordPayload = {
  __typename?: 'ChangePasswordPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type CreateArticleInput = {
  additionalDetails?: InputMaybe<Scalars['String']['input']>;
  calendarId: Scalars['String']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  date: Scalars['DateTime']['input'];
  duration?: InputMaybe<Scalars['String']['input']>;
  eventLink?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  meetingId?: InputMaybe<Scalars['String']['input']>;
  meetingType?: InputMaybe<Scalars['String']['input']>;
  organizerId: Scalars['String']['input'];
  passcode?: InputMaybe<Scalars['String']['input']>;
  speaker?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateArticlePayload = {
  __typename?: 'CreateArticlePayload';
  article?: Maybe<Article>;
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

export type CreateBulkRequestsInput = {
  calendarId: Scalars['String']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  purposeId: Scalars['String']['input'];
  userIds: Array<Scalars['String']['input']>;
};

export type CreateBulkRequestsPayload = {
  __typename?: 'CreateBulkRequestsPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  requests?: Maybe<Array<Maybe<Request>>>;
};

export type CreateCalendarInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  creatorId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateCalendarPayload = {
  __typename?: 'CreateCalendarPayload';
  calendar?: Maybe<Calendar>;
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

export type CreateFeedbackInput = {
  articleId: Scalars['String']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  feedback: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateFeedbackPayload = {
  __typename?: 'CreateFeedbackPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  feedback?: Maybe<Feedback>;
};

export type CreateInviteInput = {
  calendarId: Scalars['String']['input'];
  calendarName: Scalars['String']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  creator?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  expirationTime: Scalars['DateTime']['input'];
  token: Scalars['String']['input'];
};

export type CreateInvitePayload = {
  __typename?: 'CreateInvitePayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  invite?: Maybe<Invite>;
};

export type CreateRequestInput = {
  calendarId: Scalars['String']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type CreateRequestPayload = {
  __typename?: 'CreateRequestPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  request?: Maybe<Request>;
};

export type DeleteArticleInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteArticlePayload = {
  __typename?: 'DeleteArticlePayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedArticleId?: Maybe<Scalars['ID']['output']>;
};

export type DeleteCalendarInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteCalendarPayload = {
  __typename?: 'DeleteCalendarPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedCalendarId?: Maybe<Scalars['ID']['output']>;
};

export type DeleteFeedbackInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  feedbackId: Scalars['ID']['input'];
};

export type DeleteFeedbackPayload = {
  __typename?: 'DeleteFeedbackPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedFeedbackId?: Maybe<Scalars['ID']['output']>;
};

export type DeleteInviteInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
};

export type DeleteInvitePayload = {
  __typename?: 'DeleteInvitePayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedInviteId?: Maybe<Scalars['ID']['output']>;
};

export type DeleteRequestInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  requestId: Scalars['ID']['input'];
};

export type DeleteRequestPayload = {
  __typename?: 'DeleteRequestPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedRequestId?: Maybe<Scalars['ID']['output']>;
};

export type DeleteUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type EmailMember = Node & {
  __typename?: 'EmailMember';
  calendar: Calendar;
  calendarId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type Favorite = Node & {
  __typename?: 'Favorite';
  article: Article;
  articleId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type FavoriteConnection = {
  __typename?: 'FavoriteConnection';
  edges?: Maybe<Array<Maybe<FavoriteEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type FavoriteEdge = {
  __typename?: 'FavoriteEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Favorite>;
};

export type Feedback = Node & {
  __typename?: 'Feedback';
  article: Article;
  articleId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  feedback: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type FeedbackConnection = {
  __typename?: 'FeedbackConnection';
  edges?: Maybe<Array<Maybe<FeedbackEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type FeedbackEdge = {
  __typename?: 'FeedbackEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Feedback>;
};

export type ForgotPasswordInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
};

export type ForgotPasswordPayload = {
  __typename?: 'ForgotPasswordPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type Invite = Node & {
  __typename?: 'Invite';
  calendar: Calendar;
  calendarId: Scalars['String']['output'];
  calendarName: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  creator?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  expirationTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  token: Scalars['String']['output'];
};

export type InviteConnection = {
  __typename?: 'InviteConnection';
  edges?: Maybe<Array<Maybe<InviteEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type InviteEdge = {
  __typename?: 'InviteEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Invite>;
};

export type LoginUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginUserPayload = {
  __typename?: 'LoginUserPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addEmailMemberToCalendar?: Maybe<AddEmailMemberToCalendarPayload>;
  addFavorite?: Maybe<AddFavoritePayload>;
  changePassword?: Maybe<ChangePasswordPayload>;
  createArticle?: Maybe<CreateArticlePayload>;
  createBulkRequests?: Maybe<CreateBulkRequestsPayload>;
  createCalendar?: Maybe<CreateCalendarPayload>;
  createFeedback?: Maybe<CreateFeedbackPayload>;
  createInvite?: Maybe<CreateInvitePayload>;
  createRequest?: Maybe<CreateRequestPayload>;
  deleteArticle?: Maybe<DeleteArticlePayload>;
  deleteCalendar?: Maybe<DeleteCalendarPayload>;
  deleteFeedback?: Maybe<DeleteFeedbackPayload>;
  deleteInvite?: Maybe<DeleteInvitePayload>;
  deleteRequest?: Maybe<DeleteRequestPayload>;
  deleteUser?: Maybe<DeleteUserPayload>;
  forgotPassword?: Maybe<ForgotPasswordPayload>;
  loginUser?: Maybe<LoginUserPayload>;
  registerUser?: Maybe<RegisterUserPayload>;
  registerWithToken?: Maybe<RegisterWithTokenPayload>;
  removeFavorite?: Maybe<RemoveFavoritePayload>;
  removeUserFromCalendar?: Maybe<RemoveUserFromCalendarPayload>;
  resetPassword?: Maybe<ResetPasswordPayload>;
  toggleAttendance?: Maybe<ToggleAttendancePayload>;
  toggleFavorite?: Maybe<ToggleFavoritePayload>;
  updateArticle?: Maybe<UpdateArticlePayload>;
  updateCalendar?: Maybe<UpdateCalendarPayload>;
  updateFeedback?: Maybe<UpdateFeedbackPayload>;
  updateRequestStatus?: Maybe<UpdateRequestStatusPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
  verifyEmail?: Maybe<VerifyEmailPayload>;
};


export type MutationAddEmailMemberToCalendarArgs = {
  input: AddEmailMemberToCalendarInput;
};


export type MutationAddFavoriteArgs = {
  input: AddFavoriteInput;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCreateArticleArgs = {
  input: CreateArticleInput;
};


export type MutationCreateBulkRequestsArgs = {
  input: CreateBulkRequestsInput;
};


export type MutationCreateCalendarArgs = {
  input: CreateCalendarInput;
};


export type MutationCreateFeedbackArgs = {
  input: CreateFeedbackInput;
};


export type MutationCreateInviteArgs = {
  input: CreateInviteInput;
};


export type MutationCreateRequestArgs = {
  input: CreateRequestInput;
};


export type MutationDeleteArticleArgs = {
  input: DeleteArticleInput;
};


export type MutationDeleteCalendarArgs = {
  input: DeleteCalendarInput;
};


export type MutationDeleteFeedbackArgs = {
  input: DeleteFeedbackInput;
};


export type MutationDeleteInviteArgs = {
  input: DeleteInviteInput;
};


export type MutationDeleteRequestArgs = {
  input: DeleteRequestInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};


export type MutationRegisterWithTokenArgs = {
  input: RegisterWithTokenInput;
};


export type MutationRemoveFavoriteArgs = {
  input: RemoveFavoriteInput;
};


export type MutationRemoveUserFromCalendarArgs = {
  input: RemoveUserFromCalendarInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationToggleAttendanceArgs = {
  input: ToggleAttendanceInput;
};


export type MutationToggleFavoriteArgs = {
  input: ToggleFavoriteInput;
};


export type MutationUpdateArticleArgs = {
  input: UpdateArticleInput;
};


export type MutationUpdateCalendarArgs = {
  input: UpdateCalendarInput;
};


export type MutationUpdateFeedbackArgs = {
  input: UpdateFeedbackInput;
};


export type MutationUpdateRequestStatusArgs = {
  input: UpdateRequestStatusInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  articles?: Maybe<ArticleConnection>;
  calendar?: Maybe<Calendar>;
  calendars?: Maybe<CalendarConnection>;
  calendarsByUser?: Maybe<CalendarConnection>;
  favoriteById?: Maybe<Favorite>;
  favorites?: Maybe<FavoriteConnection>;
  feedbacks?: Maybe<FeedbackConnection>;
  invite?: Maybe<Invite>;
  invites?: Maybe<InviteConnection>;
  node?: Maybe<Node>;
  requests?: Maybe<RequestConnection>;
  userById?: Maybe<User>;
  userByToken?: Maybe<User>;
  userByUsername?: Maybe<User>;
  users?: Maybe<UserConnection>;
};


export type QueryArticlesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCalendarArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCalendarsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCalendarsByUserArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['String']['input'];
};


export type QueryFavoriteByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFavoritesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['ID']['input'];
};


export type QueryFeedbacksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryInviteArgs = {
  id: Scalars['ID']['input'];
};


export type QueryInvitesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRequestsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserByTokenArgs = {
  token: Scalars['String']['input'];
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type RegisterUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  userData: UserData;
};

export type RegisterUserPayload = {
  __typename?: 'RegisterUserPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type RegisterWithTokenInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
  university: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type RegisterWithTokenPayload = {
  __typename?: 'RegisterWithTokenPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user: User;
};

export type RemoveFavoriteInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type RemoveFavoritePayload = {
  __typename?: 'RemoveFavoritePayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedFavoriteId?: Maybe<Scalars['ID']['output']>;
};

export type RemoveUserFromCalendarInput = {
  calendarId: Scalars['ID']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};

export type RemoveUserFromCalendarPayload = {
  __typename?: 'RemoveUserFromCalendarPayload';
  calendar?: Maybe<Calendar>;
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

export type Request = Node & {
  __typename?: 'Request';
  calendar: Calendar;
  calendarId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
  yearOfStudy?: Maybe<Scalars['String']['output']>;
};

export type RequestConnection = {
  __typename?: 'RequestConnection';
  edges?: Maybe<Array<Maybe<RequestEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type RequestEdge = {
  __typename?: 'RequestEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Request>;
};

export type ResetPasswordInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  newPassword: Scalars['String']['input'];
  resetToken: Scalars['String']['input'];
};

export type ResetPasswordPayload = {
  __typename?: 'ResetPasswordPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type ToggleAttendanceInput = {
  articleId: Scalars['ID']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  isAttending: Scalars['Boolean']['input'];
  userId: Scalars['ID']['input'];
};

export type ToggleAttendancePayload = {
  __typename?: 'ToggleAttendancePayload';
  attended: Array<Article>;
  clientMutationId?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type ToggleFavoriteInput = {
  articleId: Scalars['ID']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  isFavorite: Scalars['Boolean']['input'];
  userId: Scalars['ID']['input'];
};

export type ToggleFavoritePayload = {
  __typename?: 'ToggleFavoritePayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  favorites: Array<Favorite>;
  message: Scalars['String']['output'];
};

export type UpdateArticleInput = {
  articleInput: CreateArticleInput;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type UpdateArticlePayload = {
  __typename?: 'UpdateArticlePayload';
  article?: Maybe<Article>;
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

export type UpdateCalendarInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  creatorId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateCalendarPayload = {
  __typename?: 'UpdateCalendarPayload';
  calendar?: Maybe<Calendar>;
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

export type UpdateFeedbackInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  feedback: Scalars['String']['input'];
  feedbackId: Scalars['ID']['input'];
};

export type UpdateFeedbackPayload = {
  __typename?: 'UpdateFeedbackPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  feedback?: Maybe<Feedback>;
};

export type UpdateRequestStatusInput = {
  calendarId: Scalars['ID']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  requestId: Scalars['ID']['input'];
  status: Scalars['String']['input'];
};

export type UpdateRequestStatusPayload = {
  __typename?: 'UpdateRequestStatusPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  updatedRequest?: Maybe<Request>;
};

export type UpdateUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  updates: UserUpdateInput;
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type User = Node & {
  __typename?: 'User';
  attended?: Maybe<ArticleConnection>;
  canReadCalendars?: Maybe<CalendarConnection>;
  canWriteCalendars?: Maybe<CalendarConnection>;
  createdAt: Scalars['DateTime']['output'];
  createdCalendars?: Maybe<CalendarConnection>;
  email: Scalars['String']['output'];
  emailValidated: Scalars['Boolean']['output'];
  favorites?: Maybe<FavoriteConnection>;
  feedbacks?: Maybe<FeedbackConnection>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isAdmin: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  organizedArticles?: Maybe<ArticleConnection>;
  registerToken?: Maybe<Scalars['String']['output']>;
  registerTokenExpiry?: Maybe<Scalars['Int']['output']>;
  requests?: Maybe<RequestConnection>;
  resetToken?: Maybe<Scalars['String']['output']>;
  resetTokenExpiry?: Maybe<Scalars['Int']['output']>;
  university: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type UserData = {
  email: Scalars['String']['input'];
  emailValidated?: InputMaybe<Scalars['Boolean']['input']>;
  firstName: Scalars['String']['input'];
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  registerToken?: InputMaybe<Scalars['String']['input']>;
  registerTokenExpiry?: InputMaybe<Scalars['Int']['input']>;
  university: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<User>;
};

export type UserUpdateInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  lastName: Scalars['String']['input'];
  university: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type VerifyEmailInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
};

export type VerifyEmailPayload = {
  __typename?: 'VerifyEmailPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  Node: (Article) | (Calendar) | (EmailMember) | (Favorite) | (Feedback) | (Invite) | (Request) | (User);
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddEmailMemberToCalendarInput: AddEmailMemberToCalendarInput;
  AddEmailMemberToCalendarPayload: ResolverTypeWrapper<AddEmailMemberToCalendarPayload>;
  AddFavoriteInput: AddFavoriteInput;
  AddFavoritePayload: ResolverTypeWrapper<AddFavoritePayload>;
  Article: ResolverTypeWrapper<Article>;
  ArticleConnection: ResolverTypeWrapper<ArticleConnection>;
  ArticleEdge: ResolverTypeWrapper<ArticleEdge>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Calendar: ResolverTypeWrapper<Calendar>;
  CalendarConnection: ResolverTypeWrapper<CalendarConnection>;
  CalendarEdge: ResolverTypeWrapper<CalendarEdge>;
  ChangePasswordInput: ChangePasswordInput;
  ChangePasswordPayload: ResolverTypeWrapper<ChangePasswordPayload>;
  CreateArticleInput: CreateArticleInput;
  CreateArticlePayload: ResolverTypeWrapper<CreateArticlePayload>;
  CreateBulkRequestsInput: CreateBulkRequestsInput;
  CreateBulkRequestsPayload: ResolverTypeWrapper<CreateBulkRequestsPayload>;
  CreateCalendarInput: CreateCalendarInput;
  CreateCalendarPayload: ResolverTypeWrapper<CreateCalendarPayload>;
  CreateFeedbackInput: CreateFeedbackInput;
  CreateFeedbackPayload: ResolverTypeWrapper<CreateFeedbackPayload>;
  CreateInviteInput: CreateInviteInput;
  CreateInvitePayload: ResolverTypeWrapper<CreateInvitePayload>;
  CreateRequestInput: CreateRequestInput;
  CreateRequestPayload: ResolverTypeWrapper<CreateRequestPayload>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DeleteArticleInput: DeleteArticleInput;
  DeleteArticlePayload: ResolverTypeWrapper<DeleteArticlePayload>;
  DeleteCalendarInput: DeleteCalendarInput;
  DeleteCalendarPayload: ResolverTypeWrapper<DeleteCalendarPayload>;
  DeleteFeedbackInput: DeleteFeedbackInput;
  DeleteFeedbackPayload: ResolverTypeWrapper<DeleteFeedbackPayload>;
  DeleteInviteInput: DeleteInviteInput;
  DeleteInvitePayload: ResolverTypeWrapper<DeleteInvitePayload>;
  DeleteRequestInput: DeleteRequestInput;
  DeleteRequestPayload: ResolverTypeWrapper<DeleteRequestPayload>;
  DeleteUserInput: DeleteUserInput;
  DeleteUserPayload: ResolverTypeWrapper<DeleteUserPayload>;
  EmailMember: ResolverTypeWrapper<EmailMember>;
  Favorite: ResolverTypeWrapper<Favorite>;
  FavoriteConnection: ResolverTypeWrapper<FavoriteConnection>;
  FavoriteEdge: ResolverTypeWrapper<FavoriteEdge>;
  Feedback: ResolverTypeWrapper<Feedback>;
  FeedbackConnection: ResolverTypeWrapper<FeedbackConnection>;
  FeedbackEdge: ResolverTypeWrapper<FeedbackEdge>;
  ForgotPasswordInput: ForgotPasswordInput;
  ForgotPasswordPayload: ResolverTypeWrapper<ForgotPasswordPayload>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Invite: ResolverTypeWrapper<Invite>;
  InviteConnection: ResolverTypeWrapper<InviteConnection>;
  InviteEdge: ResolverTypeWrapper<InviteEdge>;
  LoginUserInput: LoginUserInput;
  LoginUserPayload: ResolverTypeWrapper<LoginUserPayload>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  RegisterUserInput: RegisterUserInput;
  RegisterUserPayload: ResolverTypeWrapper<RegisterUserPayload>;
  RegisterWithTokenInput: RegisterWithTokenInput;
  RegisterWithTokenPayload: ResolverTypeWrapper<RegisterWithTokenPayload>;
  RemoveFavoriteInput: RemoveFavoriteInput;
  RemoveFavoritePayload: ResolverTypeWrapper<RemoveFavoritePayload>;
  RemoveUserFromCalendarInput: RemoveUserFromCalendarInput;
  RemoveUserFromCalendarPayload: ResolverTypeWrapper<RemoveUserFromCalendarPayload>;
  Request: ResolverTypeWrapper<Request>;
  RequestConnection: ResolverTypeWrapper<RequestConnection>;
  RequestEdge: ResolverTypeWrapper<RequestEdge>;
  ResetPasswordInput: ResetPasswordInput;
  ResetPasswordPayload: ResolverTypeWrapper<ResetPasswordPayload>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  ToggleAttendanceInput: ToggleAttendanceInput;
  ToggleAttendancePayload: ResolverTypeWrapper<ToggleAttendancePayload>;
  ToggleFavoriteInput: ToggleFavoriteInput;
  ToggleFavoritePayload: ResolverTypeWrapper<ToggleFavoritePayload>;
  UpdateArticleInput: UpdateArticleInput;
  UpdateArticlePayload: ResolverTypeWrapper<UpdateArticlePayload>;
  UpdateCalendarInput: UpdateCalendarInput;
  UpdateCalendarPayload: ResolverTypeWrapper<UpdateCalendarPayload>;
  UpdateFeedbackInput: UpdateFeedbackInput;
  UpdateFeedbackPayload: ResolverTypeWrapper<UpdateFeedbackPayload>;
  UpdateRequestStatusInput: UpdateRequestStatusInput;
  UpdateRequestStatusPayload: ResolverTypeWrapper<UpdateRequestStatusPayload>;
  UpdateUserInput: UpdateUserInput;
  UpdateUserPayload: ResolverTypeWrapper<UpdateUserPayload>;
  User: ResolverTypeWrapper<User>;
  UserConnection: ResolverTypeWrapper<UserConnection>;
  UserData: UserData;
  UserEdge: ResolverTypeWrapper<UserEdge>;
  UserUpdateInput: UserUpdateInput;
  VerifyEmailInput: VerifyEmailInput;
  VerifyEmailPayload: ResolverTypeWrapper<VerifyEmailPayload>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddEmailMemberToCalendarInput: AddEmailMemberToCalendarInput;
  AddEmailMemberToCalendarPayload: AddEmailMemberToCalendarPayload;
  AddFavoriteInput: AddFavoriteInput;
  AddFavoritePayload: AddFavoritePayload;
  Article: Article;
  ArticleConnection: ArticleConnection;
  ArticleEdge: ArticleEdge;
  Boolean: Scalars['Boolean']['output'];
  Calendar: Calendar;
  CalendarConnection: CalendarConnection;
  CalendarEdge: CalendarEdge;
  ChangePasswordInput: ChangePasswordInput;
  ChangePasswordPayload: ChangePasswordPayload;
  CreateArticleInput: CreateArticleInput;
  CreateArticlePayload: CreateArticlePayload;
  CreateBulkRequestsInput: CreateBulkRequestsInput;
  CreateBulkRequestsPayload: CreateBulkRequestsPayload;
  CreateCalendarInput: CreateCalendarInput;
  CreateCalendarPayload: CreateCalendarPayload;
  CreateFeedbackInput: CreateFeedbackInput;
  CreateFeedbackPayload: CreateFeedbackPayload;
  CreateInviteInput: CreateInviteInput;
  CreateInvitePayload: CreateInvitePayload;
  CreateRequestInput: CreateRequestInput;
  CreateRequestPayload: CreateRequestPayload;
  DateTime: Scalars['DateTime']['output'];
  DeleteArticleInput: DeleteArticleInput;
  DeleteArticlePayload: DeleteArticlePayload;
  DeleteCalendarInput: DeleteCalendarInput;
  DeleteCalendarPayload: DeleteCalendarPayload;
  DeleteFeedbackInput: DeleteFeedbackInput;
  DeleteFeedbackPayload: DeleteFeedbackPayload;
  DeleteInviteInput: DeleteInviteInput;
  DeleteInvitePayload: DeleteInvitePayload;
  DeleteRequestInput: DeleteRequestInput;
  DeleteRequestPayload: DeleteRequestPayload;
  DeleteUserInput: DeleteUserInput;
  DeleteUserPayload: DeleteUserPayload;
  EmailMember: EmailMember;
  Favorite: Favorite;
  FavoriteConnection: FavoriteConnection;
  FavoriteEdge: FavoriteEdge;
  Feedback: Feedback;
  FeedbackConnection: FeedbackConnection;
  FeedbackEdge: FeedbackEdge;
  ForgotPasswordInput: ForgotPasswordInput;
  ForgotPasswordPayload: ForgotPasswordPayload;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Invite: Invite;
  InviteConnection: InviteConnection;
  InviteEdge: InviteEdge;
  LoginUserInput: LoginUserInput;
  LoginUserPayload: LoginUserPayload;
  Mutation: {};
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  PageInfo: PageInfo;
  Query: {};
  RegisterUserInput: RegisterUserInput;
  RegisterUserPayload: RegisterUserPayload;
  RegisterWithTokenInput: RegisterWithTokenInput;
  RegisterWithTokenPayload: RegisterWithTokenPayload;
  RemoveFavoriteInput: RemoveFavoriteInput;
  RemoveFavoritePayload: RemoveFavoritePayload;
  RemoveUserFromCalendarInput: RemoveUserFromCalendarInput;
  RemoveUserFromCalendarPayload: RemoveUserFromCalendarPayload;
  Request: Request;
  RequestConnection: RequestConnection;
  RequestEdge: RequestEdge;
  ResetPasswordInput: ResetPasswordInput;
  ResetPasswordPayload: ResetPasswordPayload;
  String: Scalars['String']['output'];
  ToggleAttendanceInput: ToggleAttendanceInput;
  ToggleAttendancePayload: ToggleAttendancePayload;
  ToggleFavoriteInput: ToggleFavoriteInput;
  ToggleFavoritePayload: ToggleFavoritePayload;
  UpdateArticleInput: UpdateArticleInput;
  UpdateArticlePayload: UpdateArticlePayload;
  UpdateCalendarInput: UpdateCalendarInput;
  UpdateCalendarPayload: UpdateCalendarPayload;
  UpdateFeedbackInput: UpdateFeedbackInput;
  UpdateFeedbackPayload: UpdateFeedbackPayload;
  UpdateRequestStatusInput: UpdateRequestStatusInput;
  UpdateRequestStatusPayload: UpdateRequestStatusPayload;
  UpdateUserInput: UpdateUserInput;
  UpdateUserPayload: UpdateUserPayload;
  User: User;
  UserConnection: UserConnection;
  UserData: UserData;
  UserEdge: UserEdge;
  UserUpdateInput: UserUpdateInput;
  VerifyEmailInput: VerifyEmailInput;
  VerifyEmailPayload: VerifyEmailPayload;
};

export type AddEmailMemberToCalendarPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddEmailMemberToCalendarPayload'] = ResolversParentTypes['AddEmailMemberToCalendarPayload']> = {
  calendar?: Resolver<Maybe<ResolversTypes['Calendar']>, ParentType, ContextType>;
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddFavoritePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddFavoritePayload'] = ResolversParentTypes['AddFavoritePayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  favorite?: Resolver<Maybe<ResolversTypes['Favorite']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article']> = {
  additionalDetails?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  attendees?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  calendar?: Resolver<ResolversTypes['Calendar'], ParentType, ContextType>;
  calendarId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  eventLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  favorites?: Resolver<Array<ResolversTypes['Favorite']>, ParentType, ContextType>;
  feedbacks?: Resolver<Array<ResolversTypes['Feedback']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  meetingId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  meetingType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  organizer?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  organizerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  passcode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  speaker?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArticleConnection'] = ResolversParentTypes['ArticleConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['ArticleEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArticleEdge'] = ResolversParentTypes['ArticleEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalendarResolvers<ContextType = any, ParentType extends ResolversParentTypes['Calendar'] = ResolversParentTypes['Calendar']> = {
  articles?: Resolver<Maybe<ResolversTypes['ArticleConnection']>, ParentType, ContextType>;
  canReadMembers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  canWriteMembers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailMembers?: Resolver<Maybe<Array<Maybe<ResolversTypes['EmailMember']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  invites?: Resolver<Maybe<Array<Maybe<ResolversTypes['Invite']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  requests?: Resolver<Maybe<Array<Maybe<ResolversTypes['Request']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalendarConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CalendarConnection'] = ResolversParentTypes['CalendarConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['CalendarEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalendarEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CalendarEdge'] = ResolversParentTypes['CalendarEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Calendar']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangePasswordPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangePasswordPayload'] = ResolversParentTypes['ChangePasswordPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateArticlePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateArticlePayload'] = ResolversParentTypes['CreateArticlePayload']> = {
  article?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType>;
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateBulkRequestsPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateBulkRequestsPayload'] = ResolversParentTypes['CreateBulkRequestsPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requests?: Resolver<Maybe<Array<Maybe<ResolversTypes['Request']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCalendarPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateCalendarPayload'] = ResolversParentTypes['CreateCalendarPayload']> = {
  calendar?: Resolver<Maybe<ResolversTypes['Calendar']>, ParentType, ContextType>;
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateFeedbackPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateFeedbackPayload'] = ResolversParentTypes['CreateFeedbackPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  feedback?: Resolver<Maybe<ResolversTypes['Feedback']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateInvitePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateInvitePayload'] = ResolversParentTypes['CreateInvitePayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  invite?: Resolver<Maybe<ResolversTypes['Invite']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateRequestPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateRequestPayload'] = ResolversParentTypes['CreateRequestPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  request?: Resolver<Maybe<ResolversTypes['Request']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeleteArticlePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteArticlePayload'] = ResolversParentTypes['DeleteArticlePayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedArticleId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteCalendarPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteCalendarPayload'] = ResolversParentTypes['DeleteCalendarPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedCalendarId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteFeedbackPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteFeedbackPayload'] = ResolversParentTypes['DeleteFeedbackPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedFeedbackId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteInvitePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteInvitePayload'] = ResolversParentTypes['DeleteInvitePayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedInviteId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteRequestPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteRequestPayload'] = ResolversParentTypes['DeleteRequestPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedRequestId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteUserPayload'] = ResolversParentTypes['DeleteUserPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EmailMemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['EmailMember'] = ResolversParentTypes['EmailMember']> = {
  calendar?: Resolver<ResolversTypes['Calendar'], ParentType, ContextType>;
  calendarId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FavoriteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Favorite'] = ResolversParentTypes['Favorite']> = {
  article?: Resolver<ResolversTypes['Article'], ParentType, ContextType>;
  articleId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FavoriteConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FavoriteConnection'] = ResolversParentTypes['FavoriteConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['FavoriteEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FavoriteEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FavoriteEdge'] = ResolversParentTypes['FavoriteEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Favorite']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedbackResolvers<ContextType = any, ParentType extends ResolversParentTypes['Feedback'] = ResolversParentTypes['Feedback']> = {
  article?: Resolver<ResolversTypes['Article'], ParentType, ContextType>;
  articleId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  feedback?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedbackConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FeedbackConnection'] = ResolversParentTypes['FeedbackConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['FeedbackEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedbackEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FeedbackEdge'] = ResolversParentTypes['FeedbackEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Feedback']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ForgotPasswordPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ForgotPasswordPayload'] = ResolversParentTypes['ForgotPasswordPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InviteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Invite'] = ResolversParentTypes['Invite']> = {
  calendar?: Resolver<ResolversTypes['Calendar'], ParentType, ContextType>;
  calendarId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  calendarName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expirationTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InviteConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['InviteConnection'] = ResolversParentTypes['InviteConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['InviteEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InviteEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['InviteEdge'] = ResolversParentTypes['InviteEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Invite']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginUserPayload'] = ResolversParentTypes['LoginUserPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addEmailMemberToCalendar?: Resolver<Maybe<ResolversTypes['AddEmailMemberToCalendarPayload']>, ParentType, ContextType, RequireFields<MutationAddEmailMemberToCalendarArgs, 'input'>>;
  addFavorite?: Resolver<Maybe<ResolversTypes['AddFavoritePayload']>, ParentType, ContextType, RequireFields<MutationAddFavoriteArgs, 'input'>>;
  changePassword?: Resolver<Maybe<ResolversTypes['ChangePasswordPayload']>, ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'input'>>;
  createArticle?: Resolver<Maybe<ResolversTypes['CreateArticlePayload']>, ParentType, ContextType, RequireFields<MutationCreateArticleArgs, 'input'>>;
  createBulkRequests?: Resolver<Maybe<ResolversTypes['CreateBulkRequestsPayload']>, ParentType, ContextType, RequireFields<MutationCreateBulkRequestsArgs, 'input'>>;
  createCalendar?: Resolver<Maybe<ResolversTypes['CreateCalendarPayload']>, ParentType, ContextType, RequireFields<MutationCreateCalendarArgs, 'input'>>;
  createFeedback?: Resolver<Maybe<ResolversTypes['CreateFeedbackPayload']>, ParentType, ContextType, RequireFields<MutationCreateFeedbackArgs, 'input'>>;
  createInvite?: Resolver<Maybe<ResolversTypes['CreateInvitePayload']>, ParentType, ContextType, RequireFields<MutationCreateInviteArgs, 'input'>>;
  createRequest?: Resolver<Maybe<ResolversTypes['CreateRequestPayload']>, ParentType, ContextType, RequireFields<MutationCreateRequestArgs, 'input'>>;
  deleteArticle?: Resolver<Maybe<ResolversTypes['DeleteArticlePayload']>, ParentType, ContextType, RequireFields<MutationDeleteArticleArgs, 'input'>>;
  deleteCalendar?: Resolver<Maybe<ResolversTypes['DeleteCalendarPayload']>, ParentType, ContextType, RequireFields<MutationDeleteCalendarArgs, 'input'>>;
  deleteFeedback?: Resolver<Maybe<ResolversTypes['DeleteFeedbackPayload']>, ParentType, ContextType, RequireFields<MutationDeleteFeedbackArgs, 'input'>>;
  deleteInvite?: Resolver<Maybe<ResolversTypes['DeleteInvitePayload']>, ParentType, ContextType, RequireFields<MutationDeleteInviteArgs, 'input'>>;
  deleteRequest?: Resolver<Maybe<ResolversTypes['DeleteRequestPayload']>, ParentType, ContextType, RequireFields<MutationDeleteRequestArgs, 'input'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['DeleteUserPayload']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'input'>>;
  forgotPassword?: Resolver<Maybe<ResolversTypes['ForgotPasswordPayload']>, ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'input'>>;
  loginUser?: Resolver<Maybe<ResolversTypes['LoginUserPayload']>, ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'input'>>;
  registerUser?: Resolver<Maybe<ResolversTypes['RegisterUserPayload']>, ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'input'>>;
  registerWithToken?: Resolver<Maybe<ResolversTypes['RegisterWithTokenPayload']>, ParentType, ContextType, RequireFields<MutationRegisterWithTokenArgs, 'input'>>;
  removeFavorite?: Resolver<Maybe<ResolversTypes['RemoveFavoritePayload']>, ParentType, ContextType, RequireFields<MutationRemoveFavoriteArgs, 'input'>>;
  removeUserFromCalendar?: Resolver<Maybe<ResolversTypes['RemoveUserFromCalendarPayload']>, ParentType, ContextType, RequireFields<MutationRemoveUserFromCalendarArgs, 'input'>>;
  resetPassword?: Resolver<Maybe<ResolversTypes['ResetPasswordPayload']>, ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'input'>>;
  toggleAttendance?: Resolver<Maybe<ResolversTypes['ToggleAttendancePayload']>, ParentType, ContextType, RequireFields<MutationToggleAttendanceArgs, 'input'>>;
  toggleFavorite?: Resolver<Maybe<ResolversTypes['ToggleFavoritePayload']>, ParentType, ContextType, RequireFields<MutationToggleFavoriteArgs, 'input'>>;
  updateArticle?: Resolver<Maybe<ResolversTypes['UpdateArticlePayload']>, ParentType, ContextType, RequireFields<MutationUpdateArticleArgs, 'input'>>;
  updateCalendar?: Resolver<Maybe<ResolversTypes['UpdateCalendarPayload']>, ParentType, ContextType, RequireFields<MutationUpdateCalendarArgs, 'input'>>;
  updateFeedback?: Resolver<Maybe<ResolversTypes['UpdateFeedbackPayload']>, ParentType, ContextType, RequireFields<MutationUpdateFeedbackArgs, 'input'>>;
  updateRequestStatus?: Resolver<Maybe<ResolversTypes['UpdateRequestStatusPayload']>, ParentType, ContextType, RequireFields<MutationUpdateRequestStatusArgs, 'input'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['UpdateUserPayload']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
  verifyEmail?: Resolver<Maybe<ResolversTypes['VerifyEmailPayload']>, ParentType, ContextType, RequireFields<MutationVerifyEmailArgs, 'input'>>;
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Article' | 'Calendar' | 'EmailMember' | 'Favorite' | 'Feedback' | 'Invite' | 'Request' | 'User', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  articles?: Resolver<Maybe<ResolversTypes['ArticleConnection']>, ParentType, ContextType, Partial<QueryArticlesArgs>>;
  calendar?: Resolver<Maybe<ResolversTypes['Calendar']>, ParentType, ContextType, RequireFields<QueryCalendarArgs, 'id'>>;
  calendars?: Resolver<Maybe<ResolversTypes['CalendarConnection']>, ParentType, ContextType, Partial<QueryCalendarsArgs>>;
  calendarsByUser?: Resolver<Maybe<ResolversTypes['CalendarConnection']>, ParentType, ContextType, RequireFields<QueryCalendarsByUserArgs, 'userId'>>;
  favoriteById?: Resolver<Maybe<ResolversTypes['Favorite']>, ParentType, ContextType, RequireFields<QueryFavoriteByIdArgs, 'id'>>;
  favorites?: Resolver<Maybe<ResolversTypes['FavoriteConnection']>, ParentType, ContextType, RequireFields<QueryFavoritesArgs, 'userId'>>;
  feedbacks?: Resolver<Maybe<ResolversTypes['FeedbackConnection']>, ParentType, ContextType, Partial<QueryFeedbacksArgs>>;
  invite?: Resolver<Maybe<ResolversTypes['Invite']>, ParentType, ContextType, RequireFields<QueryInviteArgs, 'id'>>;
  invites?: Resolver<Maybe<ResolversTypes['InviteConnection']>, ParentType, ContextType, Partial<QueryInvitesArgs>>;
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  requests?: Resolver<Maybe<ResolversTypes['RequestConnection']>, ParentType, ContextType, Partial<QueryRequestsArgs>>;
  userById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByIdArgs, 'id'>>;
  userByToken?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByTokenArgs, 'token'>>;
  userByUsername?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByUsernameArgs, 'username'>>;
  users?: Resolver<Maybe<ResolversTypes['UserConnection']>, ParentType, ContextType, Partial<QueryUsersArgs>>;
};

export type RegisterUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterUserPayload'] = ResolversParentTypes['RegisterUserPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisterWithTokenPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterWithTokenPayload'] = ResolversParentTypes['RegisterWithTokenPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveFavoritePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveFavoritePayload'] = ResolversParentTypes['RemoveFavoritePayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedFavoriteId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveUserFromCalendarPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveUserFromCalendarPayload'] = ResolversParentTypes['RemoveUserFromCalendarPayload']> = {
  calendar?: Resolver<Maybe<ResolversTypes['Calendar']>, ParentType, ContextType>;
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RequestResolvers<ContextType = any, ParentType extends ResolversParentTypes['Request'] = ResolversParentTypes['Request']> = {
  calendar?: Resolver<ResolversTypes['Calendar'], ParentType, ContextType>;
  calendarId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  yearOfStudy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RequestConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['RequestConnection'] = ResolversParentTypes['RequestConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['RequestEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RequestEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['RequestEdge'] = ResolversParentTypes['RequestEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Request']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResetPasswordPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResetPasswordPayload'] = ResolversParentTypes['ResetPasswordPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ToggleAttendancePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ToggleAttendancePayload'] = ResolversParentTypes['ToggleAttendancePayload']> = {
  attended?: Resolver<Array<ResolversTypes['Article']>, ParentType, ContextType>;
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ToggleFavoritePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ToggleFavoritePayload'] = ResolversParentTypes['ToggleFavoritePayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  favorites?: Resolver<Array<ResolversTypes['Favorite']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateArticlePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateArticlePayload'] = ResolversParentTypes['UpdateArticlePayload']> = {
  article?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType>;
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateCalendarPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateCalendarPayload'] = ResolversParentTypes['UpdateCalendarPayload']> = {
  calendar?: Resolver<Maybe<ResolversTypes['Calendar']>, ParentType, ContextType>;
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateFeedbackPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateFeedbackPayload'] = ResolversParentTypes['UpdateFeedbackPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  feedback?: Resolver<Maybe<ResolversTypes['Feedback']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateRequestStatusPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateRequestStatusPayload'] = ResolversParentTypes['UpdateRequestStatusPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedRequest?: Resolver<Maybe<ResolversTypes['Request']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateUserPayload'] = ResolversParentTypes['UpdateUserPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  attended?: Resolver<Maybe<ResolversTypes['ArticleConnection']>, ParentType, ContextType>;
  canReadCalendars?: Resolver<Maybe<ResolversTypes['CalendarConnection']>, ParentType, ContextType>;
  canWriteCalendars?: Resolver<Maybe<ResolversTypes['CalendarConnection']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdCalendars?: Resolver<Maybe<ResolversTypes['CalendarConnection']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailValidated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  favorites?: Resolver<Maybe<ResolversTypes['FavoriteConnection']>, ParentType, ContextType>;
  feedbacks?: Resolver<Maybe<ResolversTypes['FeedbackConnection']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organizedArticles?: Resolver<Maybe<ResolversTypes['ArticleConnection']>, ParentType, ContextType>;
  registerToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  registerTokenExpiry?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  requests?: Resolver<Maybe<ResolversTypes['RequestConnection']>, ParentType, ContextType>;
  resetToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resetTokenExpiry?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  university?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifyEmailPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifyEmailPayload'] = ResolversParentTypes['VerifyEmailPayload']> = {
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AddEmailMemberToCalendarPayload?: AddEmailMemberToCalendarPayloadResolvers<ContextType>;
  AddFavoritePayload?: AddFavoritePayloadResolvers<ContextType>;
  Article?: ArticleResolvers<ContextType>;
  ArticleConnection?: ArticleConnectionResolvers<ContextType>;
  ArticleEdge?: ArticleEdgeResolvers<ContextType>;
  Calendar?: CalendarResolvers<ContextType>;
  CalendarConnection?: CalendarConnectionResolvers<ContextType>;
  CalendarEdge?: CalendarEdgeResolvers<ContextType>;
  ChangePasswordPayload?: ChangePasswordPayloadResolvers<ContextType>;
  CreateArticlePayload?: CreateArticlePayloadResolvers<ContextType>;
  CreateBulkRequestsPayload?: CreateBulkRequestsPayloadResolvers<ContextType>;
  CreateCalendarPayload?: CreateCalendarPayloadResolvers<ContextType>;
  CreateFeedbackPayload?: CreateFeedbackPayloadResolvers<ContextType>;
  CreateInvitePayload?: CreateInvitePayloadResolvers<ContextType>;
  CreateRequestPayload?: CreateRequestPayloadResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DeleteArticlePayload?: DeleteArticlePayloadResolvers<ContextType>;
  DeleteCalendarPayload?: DeleteCalendarPayloadResolvers<ContextType>;
  DeleteFeedbackPayload?: DeleteFeedbackPayloadResolvers<ContextType>;
  DeleteInvitePayload?: DeleteInvitePayloadResolvers<ContextType>;
  DeleteRequestPayload?: DeleteRequestPayloadResolvers<ContextType>;
  DeleteUserPayload?: DeleteUserPayloadResolvers<ContextType>;
  EmailMember?: EmailMemberResolvers<ContextType>;
  Favorite?: FavoriteResolvers<ContextType>;
  FavoriteConnection?: FavoriteConnectionResolvers<ContextType>;
  FavoriteEdge?: FavoriteEdgeResolvers<ContextType>;
  Feedback?: FeedbackResolvers<ContextType>;
  FeedbackConnection?: FeedbackConnectionResolvers<ContextType>;
  FeedbackEdge?: FeedbackEdgeResolvers<ContextType>;
  ForgotPasswordPayload?: ForgotPasswordPayloadResolvers<ContextType>;
  Invite?: InviteResolvers<ContextType>;
  InviteConnection?: InviteConnectionResolvers<ContextType>;
  InviteEdge?: InviteEdgeResolvers<ContextType>;
  LoginUserPayload?: LoginUserPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegisterUserPayload?: RegisterUserPayloadResolvers<ContextType>;
  RegisterWithTokenPayload?: RegisterWithTokenPayloadResolvers<ContextType>;
  RemoveFavoritePayload?: RemoveFavoritePayloadResolvers<ContextType>;
  RemoveUserFromCalendarPayload?: RemoveUserFromCalendarPayloadResolvers<ContextType>;
  Request?: RequestResolvers<ContextType>;
  RequestConnection?: RequestConnectionResolvers<ContextType>;
  RequestEdge?: RequestEdgeResolvers<ContextType>;
  ResetPasswordPayload?: ResetPasswordPayloadResolvers<ContextType>;
  ToggleAttendancePayload?: ToggleAttendancePayloadResolvers<ContextType>;
  ToggleFavoritePayload?: ToggleFavoritePayloadResolvers<ContextType>;
  UpdateArticlePayload?: UpdateArticlePayloadResolvers<ContextType>;
  UpdateCalendarPayload?: UpdateCalendarPayloadResolvers<ContextType>;
  UpdateFeedbackPayload?: UpdateFeedbackPayloadResolvers<ContextType>;
  UpdateRequestStatusPayload?: UpdateRequestStatusPayloadResolvers<ContextType>;
  UpdateUserPayload?: UpdateUserPayloadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
  VerifyEmailPayload?: VerifyEmailPayloadResolvers<ContextType>;
};

