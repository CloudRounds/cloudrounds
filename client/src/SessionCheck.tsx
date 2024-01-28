import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { sessionCheck } from './services/AuthService';

interface SessionCheckProps {
  setLoggedInUser: (user: any) => void;
}

const SessionCheck = ({ setLoggedInUser }: SessionCheckProps) => {
  const navigate = useNavigate();

  // const isNonAuthPath = () => {
  //   const nonAuthPatterns = [/^\/login$/, /^\/register$/, /^\/forgot-password$/, /^\/reset-password\/.+$/];

  //   return nonAuthPatterns.some(pattern => pattern.test(window.location.pathname));
  // };

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await sessionCheck();
        if (response.valid) {
          setLoggedInUser(response.user);
        } else {
          throw new Error('Session invalid');
        }
      } catch (error) {
        navigate('/login');
      }
    };

    verifySession();
  }, [navigate, setLoggedInUser]);

  return null;
};

export default SessionCheck;
