import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchRequests } from '@/services/RequestService';
import { Calendar, Request, User } from '@/types';

const useRequestPermissions = () => {
  const [canWriteCalendars, setCanWriteCalendars] = useState<Calendar[]>([]);
  const [canReadCalendars, setCanReadCalendars] = useState<Calendar[]>([]);
  const [allowedCalendars, setAllowedCalendars] = useState<string[]>([]);
  const [allowedRequests, setAllowedRequests] = useState<Request[]>([]);

  const localUser = localStorage.getItem('CloudRoundsUser');
  const user = localUser ? JSON.parse(localUser) as User : null;

  const { data: requests, isLoading, refetch } = useQuery('requests', fetchRequests);

  useEffect(() => {
    if (isLoading || !requests) {
      return;
    }

    // Assuming requests.calendar is an array of calendars in each request
    const canWriteMemberIds = requests.flatMap((request: Request) => request.calendar.canWriteMembers.map(member => member.id));
    const canReadMemberIds = requests.flatMap((request: Request) => request.calendar.canReadMembers.map(member => member.id));

    const canWriteRequests = requests.filter((request: Request) => canWriteMemberIds.includes(user?.id));
    const canReadRequests = requests.filter((request: Request) => canReadMemberIds.includes(user?.id));

    const uniqueCanWriteCalendars: Calendar[] = [...new Set(canWriteRequests.map((request: Request) => request.calendar))] as Calendar[];
    const uniqueCanReadCalendars: Calendar[] = [...new Set(canReadRequests.map((request: Request) => request.calendar))] as Calendar[];
    const uniqueAllowedCalendars: string[] = [...new Set(canReadRequests.map((request: Request) => request.calendar.name))] as string[];

    setCanWriteCalendars(uniqueCanWriteCalendars);
    setCanReadCalendars(uniqueCanReadCalendars);
    setAllowedCalendars(uniqueAllowedCalendars);
    setAllowedRequests(canWriteRequests);
  }, [isLoading, requests, user]);

  return {
    requests,
    canWriteCalendars,
    canReadCalendars,
    allowedCalendars,
    allowedRequests,
    isLoading,
    refetch
  };
};

export default useRequestPermissions;
