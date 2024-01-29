import { useRecoilState, useRecoilValue } from 'recoil';
import { canWriteCalendarsState, requestsFetchedState, requestsState } from '@/appState';
import { useQuery } from 'react-query';
import { fetchRequests } from '@/services/RequestService';
import { useState } from 'react';
import { Request } from '@/types';

export const useRequestData = () => {
  const [requests, setRequests] = useRecoilState(requestsState);
  const [fetched, setFetched] = useRecoilState(requestsFetchedState);
  const [allowedRequests, setAllowedRequests] = useState<Request[]>([]);
  const canWriteCalendars = useRecoilValue(canWriteCalendarsState);

  const { isLoading, refetch } = useQuery('requests', fetchRequests, {
    enabled: !fetched,
    onSuccess: (fetchedRequests) => {
      setRequests(fetchedRequests);
      setFetched(true);

      const canWriteMemberIds = canWriteCalendars.map(member => member.id);
      const canWriteRequests: Request[] = requests.filter((request) => canWriteMemberIds.includes(request.userId));
      setAllowedRequests(canWriteRequests)
    }
  });

  return { requests, setRequests, allowedRequests, setAllowedRequests, isLoading, refetch };
}