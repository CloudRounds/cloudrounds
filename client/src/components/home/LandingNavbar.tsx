import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import CloudLogo from '@/assets/images/logo.png';
import LoginSvg from './assets/login.svg';
import { useResetAppState } from '@/hooks/useResetAppState';
import { authState, userState } from '@/appState';
import { Avatar, Button, Dropdown } from 'antd';
import { EventAvailable } from '@mui/icons-material';
import { LogoutOutlined } from '@ant-design/icons';
import { User } from '@/types';

const LandingNavbar = () => {
  const user = useRecoilValue(userState);
  const [auth, setAuth] = useRecoilState(authState);
  const resetAppState = useResetAppState();

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const accessToken = localStorage.getItem('CloudRoundsToken');
      setAuth({
        isLoggedIn: !!accessToken,
        userData: user || null
      });
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleSignOut = () => {
    resetAppState();
    setAuth({ isLoggedIn: false, userData: null });
    navigate('/');
  };

  const handleSignIn = () => {
    navigate('/login');
    setAuth({ isLoggedIn: true, userData: auth.userData });
  };

  const getInitials = (user: User | null) => {
    if (!user) return '';
    return user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase();
  };

  const items = [
    {
      key: '0',
      label: 'Dashboard',
      icon: <EventAvailable />,
      onClick: () => navigate('/calendar')
    },
    {
      key: '1',
      label: 'Log Out',
      icon: <LogoutOutlined />,
      onClick: () => handleSignOut()
    }
  ];

  return (
    <div className='navContainer'>
      <div className='logoContainer'>
        <img src={CloudLogo} alt='Pennant Logo' className='logo' />
        <h4 className='title'>CloudRounds</h4>
        <div className='separator'></div>
      </div>
      <div className='authButtons'>
        {auth.isLoggedIn ? (
          <div className='avatarDropdown'>
            <Dropdown menu={{ items }}>
              <Avatar className='cursor-pointer shadow-lg border border-gray-200 bg-white text-gray-800' size='large'>
                {getInitials(user)}
              </Avatar>
            </Dropdown>
          </div>
        ) : (
          <Button className='flex items-center link px-2 py-5' onClick={handleSignIn}>
            <img src={LoginSvg} width='22' />
            <span className='authText'>Sign In</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default LandingNavbar;
