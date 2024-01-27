import * as allResolvers from './resolvers'
import { DateTimeResolver } from 'graphql-scalars';
import { printSchema } from 'graphql';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import path from 'path';
import { readFileSync } from 'fs';

export const resolvers = {
  ...allResolvers,
  DateTime: DateTimeResolver,
};

const commonScalarsTypes = readFileSync(path.join(__dirname, './typeDefs/CommonScalars.graphql'), 'utf8');
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
  ${commonScalarsTypes}
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



// const graphqlSchema = () => {
//   return loadSchemaSync('./**/*.graphql', {
//     loaders: [new GraphQLFileLoader()]
//   });
// }

// const getTypeDefs = () => {
//   const schema = graphqlSchema();
//   console.log(printSchema(schema));
//   return schema;
// }


// export const typeDefs = getTypeDefs();