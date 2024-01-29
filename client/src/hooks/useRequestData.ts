import { useRecoilState, useRecoilValue } from 'recoil';
import { canWriteCalendarsState, requestsFetchedState, requestsState, userRequestsState } from '@/appState';
import { useQuery } from 'react-query';
import { fetchRequests } from '@/services/RequestService';
import { Request } from '@/types';

export const useRequestData = () => {
  const [requests, setRequests] = useRecoilState(requestsState);
  const [fetched, setFetched] = useRecoilState(requestsFetchedState);
  const [userRequests, setUserRequests] = useRecoilState(userRequestsState);
  const canWriteCalendars = useRecoilValue(canWriteCalendarsState);

  const { isLoading, refetch } = useQuery('requests', fetchRequests, {
    enabled: !fetched,
    onSuccess: (fetchedRequests) => {
      setRequests(fetchedRequests);
      setFetched(true);

      const canWriteMemberIds = canWriteCalendars.map(member => member.id);
      const canWriteRequests: Request[] = requests.filter((request) => canWriteMemberIds.includes(request.userId));
      setUserRequests(canWriteRequests)
    }
  });

  return { requests, setRequests, userRequests, setUserRequests, isLoading, refetch };
}