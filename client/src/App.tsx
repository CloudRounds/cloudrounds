import { Suspense, lazy, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Spin } from 'antd';
import { fetchCurrentUser } from './services/UserService';
import AuthPage from './components/auth/AuthPage';
import { useQuery } from 'react-query';
import Home from './components/landing/pages/Home';
import Navbar from './components/home/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './components/auth/form/ResetPassword';
import EmailVerification from './components/auth/form/EmailVerification';
import { useSetRecoilState } from 'recoil';
import { userState } from './appState';

const CalendarsList = lazy(() => import('./components/calendars/CalendarsList'));
const RequestsList = lazy(() => import('./components/requests/RequestsList'));
const ArticleList = lazy(() => import('./components/articles/ArticleList'));
const OlderArticles = lazy(() => import('./components/articles/OlderArticles'));
const UserSettings = lazy(() => import('./components/user/UserSettings'));
const Admin = lazy(() => import('./components/admin/Admin'));

const App = () => {
  const token = localStorage.getItem('CloudRoundsToken');
  const setUser = useSetRecoilState(userState);

  const { data: fetchedUser, isLoading } = useQuery('userData', fetchCurrentUser, {
    enabled: !!token
  });

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (fetchedUser) {
      localStorage.setItem('CloudRoundsUser', JSON.stringify(fetchedUser));
      setUser(fetchedUser);
    }
  }, [isLoading, fetchedUser]);

  useEffect(() => {
    if (!token) {
      localStorage.removeItem('CloudRoundsUser');
      localStorage.removeItem('CloudRoundsToken');
      setUser(null);
    }
  }, [token]);

  return (
    <>
      <Router>
        <Navbar />
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
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
