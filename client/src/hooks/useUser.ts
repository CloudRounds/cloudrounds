import { userState } from '@/appState';
import { useRecoilValue } from 'recoil';

export const useUser = () => {
  const user = useRecoilValue(userState);

  if (user) return user;

  const localUserString = localStorage.getItem('CloudRoundsUser');

  if (localUserString) {
    try {
      const parsedUser = JSON.parse(localUserString);
      return parsedUser;
    } catch (error) {
      console.error('Failed to parse user from local storage:', error);
      return null;
    }
  }

  return null;
};
