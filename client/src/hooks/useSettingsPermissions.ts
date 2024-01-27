import { useEffect, useState } from 'react';
import { fetchCalendars } from '@/services/calendars/CalendarService';
import { useQuery } from 'react-query';
import { Calendar, User } from '@/types';

const useSettingsPermissions = (passedUser: User | null) => {
  const [user, setUser] = useState<User | null>(passedUser);

  useEffect(() => {
    if (!passedUser) {
      const localUser = localStorage.getItem('CloudRoundsUser');
      const parsedUser = localUser ? (JSON.parse(localUser) as User) : null;

      setUser(parsedUser);
    }
  }, [passedUser]);

  const [canWriteCalendars, setCanWriteCalendars] = useState<Calendar[]>([]);
  const [canReadCalendars, setCanReadCalendars] = useState<Calendar[]>([]);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchCalendars
  } = useQuery(['userCalendars', user?.id], () => fetchCalendars(user?.id || ''), {
    enabled: user !== undefined || user !== ''
  });

  useEffect(() => {
    if (!isLoading && user) {
      const canWrite = data?.filter((calendar: Calendar) => calendar.canWriteMembers.map(u => u.id).includes(user?.id.toString()));
      setCanWriteCalendars(canWrite);

      const canRead = data?.filter((calendar: Calendar) => calendar.canReadMembers.map(u => u.id).includes(user?.id));
      setCanReadCalendars(canRead);
    }
  }, [isLoading, user]);

  return {
    calendars: data,
    canWriteCalendars,
    setCanWriteCalendars,
    canReadCalendars,
    isLoading,
    refetchCalendars,
    isError,
    error
  };
};

export default useSettingsPermissions;
