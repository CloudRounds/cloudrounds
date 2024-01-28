// import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
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
import { User } from './types';

const PurposesList = lazy(() => import('./components/calendars/CalendarsList'));
const RequestsList = lazy(() => import('./components/requests/RequestsList'));
const ArticleList = lazy(() => import('./components/articles/ArticleList'));
const OlderArticles = lazy(() => import('./components/articles/OlderArticles'));
const UserSettings = lazy(() => import('./components/user/UserSettings'));
const Admin = lazy(() => import('./components/admin/Admin'));

const App = observer(() => {
  const token = localStorage.getItem('CloudRoundsToken');
  let parsedUser: User | null = null;
  try {
    const localUserData = localStorage.getItem('CloudRoundsUser');
    if (localUserData) {
      parsedUser = JSON.parse(localUserData) as User;
    }
  } catch (error) {
    console.error('Error parsing user data from localStorage', error);
  }

  const [user, setUser] = useState<User | null>(parsedUser);

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
    } else {
      localStorage.removeItem('CloudRoundsUser');
      setUser(null);
    }
  }, [isLoading, fetchedUser]);

  useEffect(() => {
    if (!token || !user) {
      localStorage.removeItem('CloudRoundsUser');
      localStorage.removeItem('CloudRoundsToken');
    }
  }, [user, token]);

  const NavbarWithLocation = () => {
    const location = useLocation();
    if (location.pathname !== '/') {
      return <Navbar />;
    }
    return null;
  };

  return (
    <>
      <Router>
        <NavbarWithLocation />
        <Suspense fallback={<Spin />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/calendar' element={<ArticleList />} />
            <Route path='/manage' element={<PurposesList />} />
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
});

export default App;
