import { requestsFetchedState, requestsState } from '@/appState';
import { fetchRequests } from '@/services/RequestService';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';

export const useRequestData = () => {
  const [requests, setRequests] = useRecoilState(requestsState);
  const [fetched, setFetched] = useRecoilState(requestsFetchedState);

  const { isLoading, refetch } = useQuery('requests', fetchRequests, {
    enabled: !fetched,
    onSuccess: (fetchedRequests) => {
      setRequests(fetchedRequests);
      setFetched(true);
    }
  });

  return { requests, setRequests, isLoading, refetch };
}