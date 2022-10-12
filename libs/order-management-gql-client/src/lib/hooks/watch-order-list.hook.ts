import { useQuery } from '@apollo/client';
import {
  FIND_ORDER_LIST_QUERY,
  IFindOrderListQueryData,
  IFindOrderListQueryVariables,
} from '../queries';

export function useWatchOrderListQuery() {
  const query = useQuery<IFindOrderListQueryData, IFindOrderListQueryVariables>(
    FIND_ORDER_LIST_QUERY,
    {
      pollInterval: 5000,
    }
  );

  return query;
}
