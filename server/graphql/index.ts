import * as allResolvers from './resolvers'
import { DateTimeResolver } from 'graphql-scalars';
import path from 'path';
import { readFileSync } from 'fs';

export const resolvers = {
  ...allResolvers,
  DateTime: DateTimeResolver,
};

const commonTypes = readFileSync(path.join(__dirname, './typeDefs/Common.graphql'), 'utf8');
const authTypes = readFileSync(path.join(__dirname, './typeDefs/Auth.graphql'), 'utf8');
const userTypes = readFileSync(path.join(__dirname, './typeDefs/User.graphql'), 'utf8');
const articleTypes = readFileSync(path.join(__dirname, './typeDefs/Article.graphql'), 'utf8');
const calendarTypes = readFileSync(path.join(__dirname, './typeDefs/Calendar.graphql'), 'utf8');
const emailMemberTypes = readFileSync(path.join(__dirname, './typeDefs/EmailMember.graphql'), 'utf8');
const requestTypes = readFileSync(path.join(__dirname, './typeDefs/Request.graphql'), 'utf8');
const inviteTypes = readFileSync(path.join(__dirname, './typeDefs/Invite.graphql'), 'utf8');
const feedbackTypes = readFileSync(path.join(__dirname, './typeDefs/Feedback.graphql'), 'utf8');
const favoriteTypes = readFileSync(path.join(__dirname, './typeDefs/Favorite.graphql'), 'utf8');

export const typeDefs = `
  ${commonTypes}
  ${authTypes}
  ${userTypes}
  ${articleTypes}
  ${calendarTypes}
  ${emailMemberTypes}
  ${requestTypes}
  ${inviteTypes}
  ${feedbackTypes}
  ${favoriteTypes}
`;
