import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const isDevelopment = process.env.NODE_ENV === 'development';
const baseUrl = isDevelopment ? 'http://localhost:3003' : '';

const httpLink = new HttpLink({
  uri: `${baseUrl}/graphql`,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

