import { requestsFetchedState, requestsState, userRequestsState, userState } from '@/appState';
import { fetchRequests } from '@/services/RequestService';
import { Request } from '@/types';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

export const useRequestData = () => {
  const user = useRecoilValue(userState)
  const [requests, setRequests] = useRecoilState(requestsState);
  const [fetched, setFetched] = useRecoilState(requestsFetchedState);
  const [userRequests, setUserRequests] = useRecoilState(userRequestsState);

  const { isLoading, refetch } = useQuery('requests', fetchRequests, {
    enabled: !fetched,
    onSuccess: (fetchedRequests) => {
      setRequests(fetchedRequests);
      setFetched(true);

      const requestsForUser: Request[] = requests.filter(r => r.userId === user?.id);
      console.log(requestsForUser)
      setUserRequests(requestsForUser)
    }
  });

  return { requests, setRequests, userRequests, setUserRequests, isLoading, refetch };
}