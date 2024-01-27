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

export type Article = {
  __typename?: 'Article';
  additionalDetails?: Maybe<Scalars['String']['output']>;
  attendees: Array<User>;
  calendar: Calendar;
  calendarId: Scalars['String']['output'];
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

export type ArticleCreateInput = {
  additionalDetails?: InputMaybe<Scalars['String']['input']>;
  calendarId: Scalars['String']['input'];
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

export type Calendar = {
  __typename?: 'Calendar';
  articles?: Maybe<Array<Maybe<Article>>>;
  canReadMembers?: Maybe<Array<Maybe<User>>>;
  canWriteMembers?: Maybe<Array<Maybe<User>>>;
  creator?: Maybe<User>;
  creatorId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emailMembers?: Maybe<Array<Maybe<EmailMember>>>;
  id: Scalars['ID']['output'];
  invites?: Maybe<Array<Maybe<Invite>>>;
  name: Scalars['String']['output'];
  requests?: Maybe<Array<Maybe<Request>>>;
};

export type CalendarCreateInput = {
  creatorId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CalendarUpdateInput = {
  creatorId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type ChangePasswordResponse = {
  __typename?: 'ChangePasswordResponse';
  message: Scalars['String']['output'];
};

export type DeleteArticleResponse = {
  __typename?: 'DeleteArticleResponse';
  message: Scalars['String']['output'];
};

export type DeleteCalendarResponse = {
  __typename?: 'DeleteCalendarResponse';
  message: Scalars['String']['output'];
};

export type DeleteFavoriteResponse = {
  __typename?: 'DeleteFavoriteResponse';
  message: Scalars['String']['output'];
};

export type DeleteFeedbackResponse = {
  __typename?: 'DeleteFeedbackResponse';
  message: Scalars['String']['output'];
};

export type DeleteInviteResponse = {
  __typename?: 'DeleteInviteResponse';
  message: Scalars['String']['output'];
};

export type DeleteRequestResponse = {
  __typename?: 'DeleteRequestResponse';
  message: Scalars['String']['output'];
};

export type DeleteUserResponse = {
  __typename?: 'DeleteUserResponse';
  message: Scalars['String']['output'];
};

export type EmailMember = {
  __typename?: 'EmailMember';
  calendar: Calendar;
  calendarId: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type Favorite = {
  __typename?: 'Favorite';
  article: Article;
  articleId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type FavoriteCreateInput = {
  articleId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type Feedback = {
  __typename?: 'Feedback';
  article: Article;
  articleId: Scalars['String']['output'];
  feedback: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type FeedbackInput = {
  articleId: Scalars['String']['input'];
  feedback: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  message: Scalars['String']['output'];
};

export type Invite = {
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

export type InviteInput = {
  calendarId: Scalars['String']['input'];
  calendarName: Scalars['String']['input'];
  creator?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  expirationTime: Scalars['DateTime']['input'];
  token: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  message: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addEmailMemberToCalendar: Calendar;
  addFavorite: Favorite;
  changePassword?: Maybe<ChangePasswordResponse>;
  createArticle: Article;
  createBulkRequests?: Maybe<Array<Maybe<Request>>>;
  createCalendar: Calendar;
  createFeedback: Feedback;
  createInvite: Invite;
  createRequest?: Maybe<Request>;
  deleteArticle: DeleteArticleResponse;
  deleteCalendar: DeleteCalendarResponse;
  deleteFeedback: DeleteFeedbackResponse;
  deleteInvite: DeleteInviteResponse;
  deleteRequest?: Maybe<DeleteRequestResponse>;
  deleteUser?: Maybe<DeleteUserResponse>;
  forgotPassword: ForgotPasswordResponse;
  loginUser?: Maybe<LoginResponse>;
  registerUser?: Maybe<User>;
  registerWithToken: RegisterResponse;
  removeFavorite: DeleteFavoriteResponse;
  removeUserFromCalendar: RemoveUserFromCalendarResponse;
  resetPassword: ResetPasswordResponse;
  toggleAttendance?: Maybe<ToggleAttendanceResponse>;
  toggleFavorite?: Maybe<ToggleFavoriteResponse>;
  updateArticle: Article;
  updateCalendar: Calendar;
  updateFeedback: Feedback;
  updateRequestStatus?: Maybe<UpdateRequestStatusResponse>;
  updateUser?: Maybe<User>;
  verifyEmail: VerifyEmailResponse;
};


export type MutationAddEmailMemberToCalendarArgs = {
  calendarId: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


export type MutationAddFavoriteArgs = {
  favoriteInput: FavoriteCreateInput;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreateArticleArgs = {
  articleInput: ArticleCreateInput;
};


export type MutationCreateBulkRequestsArgs = {
  purposeId: Scalars['String']['input'];
  userIds: Array<Scalars['String']['input']>;
};


export type MutationCreateCalendarArgs = {
  calendarInput: CalendarCreateInput;
};


export type MutationCreateFeedbackArgs = {
  feedbackInput: FeedbackInput;
};


export type MutationCreateInviteArgs = {
  inviteInput: InviteInput;
};


export type MutationCreateRequestArgs = {
  calendarId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationDeleteArticleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCalendarArgs = {
  calendarId: Scalars['String']['input'];
};


export type MutationDeleteFeedbackArgs = {
  feedbackId: Scalars['String']['input'];
};


export type MutationDeleteInviteArgs = {
  token: Scalars['String']['input'];
};


export type MutationDeleteRequestArgs = {
  requestId: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRegisterUserArgs = {
  userData: UserData;
};


export type MutationRegisterWithTokenArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
  university: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRemoveFavoriteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveUserFromCalendarArgs = {
  calendarId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  resetToken: Scalars['String']['input'];
};


export type MutationToggleAttendanceArgs = {
  articleId: Scalars['ID']['input'];
  isAttending: Scalars['Boolean']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationToggleFavoriteArgs = {
  articleId: Scalars['ID']['input'];
  isFavorite: Scalars['Boolean']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationUpdateArticleArgs = {
  articleInput: ArticleCreateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateCalendarArgs = {
  calendarInput: CalendarUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateFeedbackArgs = {
  feedback: Scalars['String']['input'];
  feedbackId: Scalars['String']['input'];
};


export type MutationUpdateRequestStatusArgs = {
  calendarId: Scalars['ID']['input'];
  requestId: Scalars['ID']['input'];
  status: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  updates: UserUpdateInput;
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  articles: Array<Article>;
  calendar?: Maybe<Calendar>;
  calendars?: Maybe<Array<Maybe<Calendar>>>;
  calendarsByUser?: Maybe<Array<Maybe<Calendar>>>;
  deleteFeedback: Array<Feedback>;
  favoriteById?: Maybe<Favorite>;
  favorites: Array<Favorite>;
  feedbacks: Array<Feedback>;
  invite: Invite;
  invites: Array<Invite>;
  requests?: Maybe<Array<Maybe<Request>>>;
  userById?: Maybe<User>;
  userByToken?: Maybe<User>;
  userByUsername?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryCalendarArgs = {
  calendarId: Scalars['String']['input'];
};


export type QueryCalendarsByUserArgs = {
  userId: Scalars['String']['input'];
};


export type QueryDeleteFeedbackArgs = {
  userId: Scalars['String']['input'];
};


export type QueryFavoriteByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFavoritesArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryInviteArgs = {
  token: Scalars['String']['input'];
};


export type QueryUserByIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryUserByTokenArgs = {
  token: Scalars['String']['input'];
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String']['input'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  message: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user: User;
};

export type RemoveUserFromCalendarResponse = {
  __typename?: 'RemoveUserFromCalendarResponse';
  message: Scalars['String']['output'];
};

export type Request = {
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

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  message: Scalars['String']['output'];
};

export type ToggleAttendanceResponse = {
  __typename?: 'ToggleAttendanceResponse';
  attended: Array<Article>;
  message: Scalars['String']['output'];
};

export type ToggleFavoriteResponse = {
  __typename?: 'ToggleFavoriteResponse';
  favorites: Array<Favorite>;
  message: Scalars['String']['output'];
};

export type UpdateRequestStatusResponse = {
  __typename?: 'UpdateRequestStatusResponse';
  status: Scalars['String']['output'];
  updatedRequest?: Maybe<Request>;
};

export type User = {
  __typename?: 'User';
  attended: Array<Article>;
  canReadCalendars: Array<Calendar>;
  canWriteCalendars: Array<Calendar>;
  createdCalendars: Array<Calendar>;
  email: Scalars['String']['output'];
  emailValidated: Scalars['Boolean']['output'];
  favorites: Array<Favorite>;
  feedbacks: Array<Feedback>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isAdmin: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  organizedArticles: Array<Article>;
  password: Scalars['String']['output'];
  registerToken?: Maybe<Scalars['String']['output']>;
  registerTokenExpiry?: Maybe<Scalars['Int']['output']>;
  requests: Array<Request>;
  resetToken?: Maybe<Scalars['String']['output']>;
  resetTokenExpiry?: Maybe<Scalars['Int']['output']>;
  university: Scalars['String']['output'];
  username: Scalars['String']['output'];
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

export type UserUpdateInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  lastName: Scalars['String']['input'];
  university: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type VerifyEmailResponse = {
  __typename?: 'VerifyEmailResponse';
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



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Article: ResolverTypeWrapper<Article>;
  ArticleCreateInput: ArticleCreateInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Calendar: ResolverTypeWrapper<Calendar>;
  CalendarCreateInput: CalendarCreateInput;
  CalendarUpdateInput: CalendarUpdateInput;
  ChangePasswordResponse: ResolverTypeWrapper<ChangePasswordResponse>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DeleteArticleResponse: ResolverTypeWrapper<DeleteArticleResponse>;
  DeleteCalendarResponse: ResolverTypeWrapper<DeleteCalendarResponse>;
  DeleteFavoriteResponse: ResolverTypeWrapper<DeleteFavoriteResponse>;
  DeleteFeedbackResponse: ResolverTypeWrapper<DeleteFeedbackResponse>;
  DeleteInviteResponse: ResolverTypeWrapper<DeleteInviteResponse>;
  DeleteRequestResponse: ResolverTypeWrapper<DeleteRequestResponse>;
  DeleteUserResponse: ResolverTypeWrapper<DeleteUserResponse>;
  EmailMember: ResolverTypeWrapper<EmailMember>;
  Favorite: ResolverTypeWrapper<Favorite>;
  FavoriteCreateInput: FavoriteCreateInput;
  Feedback: ResolverTypeWrapper<Feedback>;
  FeedbackInput: FeedbackInput;
  ForgotPasswordResponse: ResolverTypeWrapper<ForgotPasswordResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Invite: ResolverTypeWrapper<Invite>;
  InviteInput: InviteInput;
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RegisterResponse: ResolverTypeWrapper<RegisterResponse>;
  RemoveUserFromCalendarResponse: ResolverTypeWrapper<RemoveUserFromCalendarResponse>;
  Request: ResolverTypeWrapper<Request>;
  ResetPasswordResponse: ResolverTypeWrapper<ResetPasswordResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  ToggleAttendanceResponse: ResolverTypeWrapper<ToggleAttendanceResponse>;
  ToggleFavoriteResponse: ResolverTypeWrapper<ToggleFavoriteResponse>;
  UpdateRequestStatusResponse: ResolverTypeWrapper<UpdateRequestStatusResponse>;
  User: ResolverTypeWrapper<User>;
  UserData: UserData;
  UserUpdateInput: UserUpdateInput;
  VerifyEmailResponse: ResolverTypeWrapper<VerifyEmailResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Article: Article;
  ArticleCreateInput: ArticleCreateInput;
  Boolean: Scalars['Boolean']['output'];
  Calendar: Calendar;
  CalendarCreateInput: CalendarCreateInput;
  CalendarUpdateInput: CalendarUpdateInput;
  ChangePasswordResponse: ChangePasswordResponse;
  DateTime: Scalars['DateTime']['output'];
  DeleteArticleResponse: DeleteArticleResponse;
  DeleteCalendarResponse: DeleteCalendarResponse;
  DeleteFavoriteResponse: DeleteFavoriteResponse;
  DeleteFeedbackResponse: DeleteFeedbackResponse;
  DeleteInviteResponse: DeleteInviteResponse;
  DeleteRequestResponse: DeleteRequestResponse;
  DeleteUserResponse: DeleteUserResponse;
  EmailMember: EmailMember;
  Favorite: Favorite;
  FavoriteCreateInput: FavoriteCreateInput;
  Feedback: Feedback;
  FeedbackInput: FeedbackInput;
  ForgotPasswordResponse: ForgotPasswordResponse;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Invite: Invite;
  InviteInput: InviteInput;
  LoginResponse: LoginResponse;
  Mutation: {};
  Query: {};
  RegisterResponse: RegisterResponse;
  RemoveUserFromCalendarResponse: RemoveUserFromCalendarResponse;
  Request: Request;
  ResetPasswordResponse: ResetPasswordResponse;
  String: Scalars['String']['output'];
  ToggleAttendanceResponse: ToggleAttendanceResponse;
  ToggleFavoriteResponse: ToggleFavoriteResponse;
  UpdateRequestStatusResponse: UpdateRequestStatusResponse;
  User: User;
  UserData: UserData;
  UserUpdateInput: UserUpdateInput;
  VerifyEmailResponse: VerifyEmailResponse;
};

export type ArticleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article']> = {
  additionalDetails?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  attendees?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  calendar?: Resolver<ResolversTypes['Calendar'], ParentType, ContextType>;
  calendarId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type CalendarResolvers<ContextType = any, ParentType extends ResolversParentTypes['Calendar'] = ResolversParentTypes['Calendar']> = {
  articles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Article']>>>, ParentType, ContextType>;
  canReadMembers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  canWriteMembers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
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

export type ChangePasswordResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangePasswordResponse'] = ResolversParentTypes['ChangePasswordResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeleteArticleResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteArticleResponse'] = ResolversParentTypes['DeleteArticleResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteCalendarResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteCalendarResponse'] = ResolversParentTypes['DeleteCalendarResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteFavoriteResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteFavoriteResponse'] = ResolversParentTypes['DeleteFavoriteResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteFeedbackResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteFeedbackResponse'] = ResolversParentTypes['DeleteFeedbackResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteInviteResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteInviteResponse'] = ResolversParentTypes['DeleteInviteResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteRequestResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteRequestResponse'] = ResolversParentTypes['DeleteRequestResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteUserResponse'] = ResolversParentTypes['DeleteUserResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EmailMemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['EmailMember'] = ResolversParentTypes['EmailMember']> = {
  calendar?: Resolver<ResolversTypes['Calendar'], ParentType, ContextType>;
  calendarId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FavoriteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Favorite'] = ResolversParentTypes['Favorite']> = {
  article?: Resolver<ResolversTypes['Article'], ParentType, ContextType>;
  articleId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedbackResolvers<ContextType = any, ParentType extends ResolversParentTypes['Feedback'] = ResolversParentTypes['Feedback']> = {
  article?: Resolver<ResolversTypes['Article'], ParentType, ContextType>;
  articleId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  feedback?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ForgotPasswordResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ForgotPasswordResponse'] = ResolversParentTypes['ForgotPasswordResponse']> = {
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

export type LoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addEmailMemberToCalendar?: Resolver<ResolversTypes['Calendar'], ParentType, ContextType, RequireFields<MutationAddEmailMemberToCalendarArgs, 'calendarId' | 'email'>>;
  addFavorite?: Resolver<ResolversTypes['Favorite'], ParentType, ContextType, RequireFields<MutationAddFavoriteArgs, 'favoriteInput'>>;
  changePassword?: Resolver<Maybe<ResolversTypes['ChangePasswordResponse']>, ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'currentPassword' | 'newPassword' | 'userId'>>;
  createArticle?: Resolver<ResolversTypes['Article'], ParentType, ContextType, RequireFields<MutationCreateArticleArgs, 'articleInput'>>;
  createBulkRequests?: Resolver<Maybe<Array<Maybe<ResolversTypes['Request']>>>, ParentType, ContextType, RequireFields<MutationCreateBulkRequestsArgs, 'purposeId' | 'userIds'>>;
  createCalendar?: Resolver<ResolversTypes['Calendar'], ParentType, ContextType, RequireFields<MutationCreateCalendarArgs, 'calendarInput'>>;
  createFeedback?: Resolver<ResolversTypes['Feedback'], ParentType, ContextType, RequireFields<MutationCreateFeedbackArgs, 'feedbackInput'>>;
  createInvite?: Resolver<ResolversTypes['Invite'], ParentType, ContextType, RequireFields<MutationCreateInviteArgs, 'inviteInput'>>;
  createRequest?: Resolver<Maybe<ResolversTypes['Request']>, ParentType, ContextType, RequireFields<MutationCreateRequestArgs, 'calendarId' | 'userId'>>;
  deleteArticle?: Resolver<ResolversTypes['DeleteArticleResponse'], ParentType, ContextType, RequireFields<MutationDeleteArticleArgs, 'id'>>;
  deleteCalendar?: Resolver<ResolversTypes['DeleteCalendarResponse'], ParentType, ContextType, RequireFields<MutationDeleteCalendarArgs, 'calendarId'>>;
  deleteFeedback?: Resolver<ResolversTypes['DeleteFeedbackResponse'], ParentType, ContextType, RequireFields<MutationDeleteFeedbackArgs, 'feedbackId'>>;
  deleteInvite?: Resolver<ResolversTypes['DeleteInviteResponse'], ParentType, ContextType, RequireFields<MutationDeleteInviteArgs, 'token'>>;
  deleteRequest?: Resolver<Maybe<ResolversTypes['DeleteRequestResponse']>, ParentType, ContextType, RequireFields<MutationDeleteRequestArgs, 'requestId'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['DeleteUserResponse']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  forgotPassword?: Resolver<ResolversTypes['ForgotPasswordResponse'], ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'email'>>;
  loginUser?: Resolver<Maybe<ResolversTypes['LoginResponse']>, ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'password' | 'username'>>;
  registerUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'userData'>>;
  registerWithToken?: Resolver<ResolversTypes['RegisterResponse'], ParentType, ContextType, RequireFields<MutationRegisterWithTokenArgs, 'email' | 'firstName' | 'lastName' | 'password' | 'token' | 'university' | 'username'>>;
  removeFavorite?: Resolver<ResolversTypes['DeleteFavoriteResponse'], ParentType, ContextType, RequireFields<MutationRemoveFavoriteArgs, 'id'>>;
  removeUserFromCalendar?: Resolver<ResolversTypes['RemoveUserFromCalendarResponse'], ParentType, ContextType, RequireFields<MutationRemoveUserFromCalendarArgs, 'calendarId' | 'userId'>>;
  resetPassword?: Resolver<ResolversTypes['ResetPasswordResponse'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'newPassword' | 'resetToken'>>;
  toggleAttendance?: Resolver<Maybe<ResolversTypes['ToggleAttendanceResponse']>, ParentType, ContextType, RequireFields<MutationToggleAttendanceArgs, 'articleId' | 'isAttending' | 'userId'>>;
  toggleFavorite?: Resolver<Maybe<ResolversTypes['ToggleFavoriteResponse']>, ParentType, ContextType, RequireFields<MutationToggleFavoriteArgs, 'articleId' | 'isFavorite' | 'userId'>>;
  updateArticle?: Resolver<ResolversTypes['Article'], ParentType, ContextType, RequireFields<MutationUpdateArticleArgs, 'articleInput' | 'id'>>;
  updateCalendar?: Resolver<ResolversTypes['Calendar'], ParentType, ContextType, RequireFields<MutationUpdateCalendarArgs, 'calendarInput' | 'id'>>;
  updateFeedback?: Resolver<ResolversTypes['Feedback'], ParentType, ContextType, RequireFields<MutationUpdateFeedbackArgs, 'feedback' | 'feedbackId'>>;
  updateRequestStatus?: Resolver<Maybe<ResolversTypes['UpdateRequestStatusResponse']>, ParentType, ContextType, RequireFields<MutationUpdateRequestStatusArgs, 'calendarId' | 'requestId' | 'status'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'updates'>>;
  verifyEmail?: Resolver<ResolversTypes['VerifyEmailResponse'], ParentType, ContextType, RequireFields<MutationVerifyEmailArgs, 'token'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  articles?: Resolver<Array<ResolversTypes['Article']>, ParentType, ContextType>;
  calendar?: Resolver<Maybe<ResolversTypes['Calendar']>, ParentType, ContextType, RequireFields<QueryCalendarArgs, 'calendarId'>>;
  calendars?: Resolver<Maybe<Array<Maybe<ResolversTypes['Calendar']>>>, ParentType, ContextType>;
  calendarsByUser?: Resolver<Maybe<Array<Maybe<ResolversTypes['Calendar']>>>, ParentType, ContextType, RequireFields<QueryCalendarsByUserArgs, 'userId'>>;
  deleteFeedback?: Resolver<Array<ResolversTypes['Feedback']>, ParentType, ContextType, RequireFields<QueryDeleteFeedbackArgs, 'userId'>>;
  favoriteById?: Resolver<Maybe<ResolversTypes['Favorite']>, ParentType, ContextType, RequireFields<QueryFavoriteByIdArgs, 'id'>>;
  favorites?: Resolver<Array<ResolversTypes['Favorite']>, ParentType, ContextType, RequireFields<QueryFavoritesArgs, 'userId'>>;
  feedbacks?: Resolver<Array<ResolversTypes['Feedback']>, ParentType, ContextType>;
  invite?: Resolver<ResolversTypes['Invite'], ParentType, ContextType, RequireFields<QueryInviteArgs, 'token'>>;
  invites?: Resolver<Array<ResolversTypes['Invite']>, ParentType, ContextType>;
  requests?: Resolver<Maybe<Array<Maybe<ResolversTypes['Request']>>>, ParentType, ContextType>;
  userById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByIdArgs, 'userId'>>;
  userByToken?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByTokenArgs, 'token'>>;
  userByUsername?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByUsernameArgs, 'username'>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
};

export type RegisterResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterResponse'] = ResolversParentTypes['RegisterResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveUserFromCalendarResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveUserFromCalendarResponse'] = ResolversParentTypes['RemoveUserFromCalendarResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type ResetPasswordResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResetPasswordResponse'] = ResolversParentTypes['ResetPasswordResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ToggleAttendanceResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ToggleAttendanceResponse'] = ResolversParentTypes['ToggleAttendanceResponse']> = {
  attended?: Resolver<Array<ResolversTypes['Article']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ToggleFavoriteResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ToggleFavoriteResponse'] = ResolversParentTypes['ToggleFavoriteResponse']> = {
  favorites?: Resolver<Array<ResolversTypes['Favorite']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateRequestStatusResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateRequestStatusResponse'] = ResolversParentTypes['UpdateRequestStatusResponse']> = {
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedRequest?: Resolver<Maybe<ResolversTypes['Request']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  attended?: Resolver<Array<ResolversTypes['Article']>, ParentType, ContextType>;
  canReadCalendars?: Resolver<Array<ResolversTypes['Calendar']>, ParentType, ContextType>;
  canWriteCalendars?: Resolver<Array<ResolversTypes['Calendar']>, ParentType, ContextType>;
  createdCalendars?: Resolver<Array<ResolversTypes['Calendar']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailValidated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  favorites?: Resolver<Array<ResolversTypes['Favorite']>, ParentType, ContextType>;
  feedbacks?: Resolver<Array<ResolversTypes['Feedback']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organizedArticles?: Resolver<Array<ResolversTypes['Article']>, ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  registerToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  registerTokenExpiry?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  requests?: Resolver<Array<ResolversTypes['Request']>, ParentType, ContextType>;
  resetToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resetTokenExpiry?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  university?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifyEmailResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifyEmailResponse'] = ResolversParentTypes['VerifyEmailResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Article?: ArticleResolvers<ContextType>;
  Calendar?: CalendarResolvers<ContextType>;
  ChangePasswordResponse?: ChangePasswordResponseResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DeleteArticleResponse?: DeleteArticleResponseResolvers<ContextType>;
  DeleteCalendarResponse?: DeleteCalendarResponseResolvers<ContextType>;
  DeleteFavoriteResponse?: DeleteFavoriteResponseResolvers<ContextType>;
  DeleteFeedbackResponse?: DeleteFeedbackResponseResolvers<ContextType>;
  DeleteInviteResponse?: DeleteInviteResponseResolvers<ContextType>;
  DeleteRequestResponse?: DeleteRequestResponseResolvers<ContextType>;
  DeleteUserResponse?: DeleteUserResponseResolvers<ContextType>;
  EmailMember?: EmailMemberResolvers<ContextType>;
  Favorite?: FavoriteResolvers<ContextType>;
  Feedback?: FeedbackResolvers<ContextType>;
  ForgotPasswordResponse?: ForgotPasswordResponseResolvers<ContextType>;
  Invite?: InviteResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegisterResponse?: RegisterResponseResolvers<ContextType>;
  RemoveUserFromCalendarResponse?: RemoveUserFromCalendarResponseResolvers<ContextType>;
  Request?: RequestResolvers<ContextType>;
  ResetPasswordResponse?: ResetPasswordResponseResolvers<ContextType>;
  ToggleAttendanceResponse?: ToggleAttendanceResponseResolvers<ContextType>;
  ToggleFavoriteResponse?: ToggleFavoriteResponseResolvers<ContextType>;
  UpdateRequestStatusResponse?: UpdateRequestStatusResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  VerifyEmailResponse?: VerifyEmailResponseResolvers<ContextType>;
};

