import { Spin } from 'antd';
import { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthPage from './components/auth/AuthPage';
import EmailVerification from './components/auth/form/EmailVerification';
import ResetPassword from './components/auth/form/ResetPassword';
import NavbarWrapper from './components/home/NavbarWrapper';
import Home from './components/landing/pages/Home';
import ScheduleViewer from './components/schedule/ScheduleViewer';
import { useUser } from './hooks/useUser';

const CalendarsList = lazy(() => import('./components/calendars/CalendarsList'));
const RequestsList = lazy(() => import('./components/requests/RequestsList'));
const ArticleList = lazy(() => import('./components/articles/ArticleList'));
const OlderArticles = lazy(() => import('./components/articles/OlderArticles'));
const UserSettings = lazy(() => import('./components/user/UserSettings'));
const Admin = lazy(() => import('./components/admin/Admin'));

const App = () => {
  const { isLoading } = useUser();

  if (isLoading) {
    return <Spin />;
  }
  return (
    <>
      <Router>
        <NavbarWrapper />
        <Suspense fallback={<Spin />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/calendar' element={<ArticleList />} />
            <Route path='/manage' element={<CalendarsList />} />
            <Route path='/past-events' element={<OlderArticles />} />
            <Route path='/requests' element={<RequestsList />} />
            <Route path='/login' element={<AuthPage />} />
            <Route path='/verify-email/:token' element={<EmailVerification />} />
            <Route path='/register' element={<AuthPage />} />
            <Route path='/forgot-password' element={<AuthPage />} />
            <Route path='/reset-password/:resetToken' element={<ResetPassword />} />
            <Route path='/settings' element={<UserSettings />} />
            <Route path='/schedules' element={<ScheduleViewer />} />
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
