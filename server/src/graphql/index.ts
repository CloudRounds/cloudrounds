import * as allResolvers from './resolvers'
import { DateTimeResolver } from 'graphql-scalars';
import { printSchema } from 'graphql';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';


export const resolvers = {
  ...allResolvers,
  DateTime: DateTimeResolver,
};


const graphqlSchema = () => {
  return loadSchemaSync('./**/*.graphql', {
    loaders: [new GraphQLFileLoader()]
  });
}

const getTypeDefs = () => {
  const schema = graphqlSchema();
  console.log(printSchema(schema));
  return schema;
}


export const typeDefs = getTypeDefs();