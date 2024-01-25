import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'mobx-react';
import userStore from './stores/userStore.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import './main.css';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apolloClient.js';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <Provider userStore={userStore}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </ApolloProvider>
);
