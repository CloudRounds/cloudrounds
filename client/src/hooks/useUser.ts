import { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userState } from '@/appState';
import { useQuery } from 'react-query';
import { fetchCurrentUser } from '@/services/UserService';

export const useUser = () => {
  const setUser = useSetRecoilState(userState);
  const user = useRecoilValue(userState);
  const token = localStorage.getItem('CloudRoundsToken');

  const { isLoading } = useQuery('currentUser', fetchCurrentUser, {
    enabled: !!token,
    onSuccess: (data) => {
      localStorage.setItem('CloudRoundsUser', JSON.stringify(data));
      setUser(data);
    },
    onError: () => {
      localStorage.removeItem('CloudRoundsUser');
      localStorage.removeItem('CloudRoundsToken');
      setUser(null);
    }
  });

  useEffect(() => {
    if (!token) {
      localStorage.removeItem('CloudRoundsUser');
      localStorage.removeItem('CloudRoundsToken');
      setUser(null);
    }
  }, [token, setUser]);

  // Fallback: return user from recoil or localStorage 
  if (user) return { user, isLoading };

  const localUserString = localStorage.getItem('CloudRoundsUser');
  if (localUserString) {
    try {
      const parsedUser = JSON.parse(localUserString);
      return { user: parsedUser, isLoading };
    } catch (error) {
      console.error('Failed to parse user from local storage:', error);
      return { user: null, isLoading };
    }
  }

  return { user: null, isLoading };
};
