import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import './main.css';
import { ScheduleProvider } from './contexts/ScheduleContext.js';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ScheduleProvider>
        <App />
      </ScheduleProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
