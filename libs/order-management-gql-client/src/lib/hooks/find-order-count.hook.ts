import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import {
  IOrderCount,
  ORDER_COUNT_FRAGMENT_GQL,
  ORDER_FRAGMENT_GQL,
  ORDER_LIST_FRAGMENT_GQL,
} from '../fragments';
import {
  FIND_ORDER_COUNT_QUERY,
  IFindOrderCountQueryData,
  IFindOrderCountQueryVariables,
} from '../queries';
import {
  IOnOrderCreatedSubscription,
  ORDER_CREATED_SUBSCRIPTION,
} from '../subscriptions';

export function useFindOrderCount(state: string) {
  const query = useQuery<
    IFindOrderCountQueryData,
    IFindOrderCountQueryVariables
  >(FIND_ORDER_COUNT_QUERY, {
    variables: { state },
  });

  return query;
}

export function useFindOpenOrderCount() {
  const query = useQuery<
    IFindOrderCountQueryData,
    IFindOrderCountQueryVariables
  >(FIND_ORDER_COUNT_QUERY, {
    variables: { state: 'OPEN' },
  });
  const apolloClient = useApolloClient();
  useSubscription<IOnOrderCreatedSubscription>(ORDER_CREATED_SUBSCRIPTION, {
    onData: (event) => {
      const openOrdersCount = apolloClient.readFragment<IOrderCount>({
        fragment: ORDER_COUNT_FRAGMENT_GQL,
        fragmentName: 'OrderCountFragment',
        id: `OrderCount:{"state":"OPEN"}`,
      });

      apolloClient.writeFragment({
        fragment: ORDER_COUNT_FRAGMENT_GQL,
        fragmentName: 'OrderCountFragment',
        id: `OrderCount:{"state":"OPEN"}`,
        data: {
          ...openOrdersCount,
          count: (openOrdersCount?.count || 0) + 1,
        },
      });

      apolloClient.writeFragment({
        fragment: ORDER_FRAGMENT_GQL,
        fragmentName: 'OrderFragment',
        id: `Order:{"orderId":"${event.data.data?.onOrderCreated.order.orderId}"}`,
        data: event.data.data?.onOrderCreated.order,
      });

      const allOrderList = apolloClient.readFragment({
        fragment: ORDER_LIST_FRAGMENT_GQL,
        fragmentName: 'OrderListFragment',
        id: 'OrderList:{"__typename":"OrderList","filter":{"state":null}}',
      });
      apolloClient.writeFragment({
        fragment: ORDER_LIST_FRAGMENT_GQL,
        fragmentName: 'OrderListFragment',
        id: 'OrderList:{"__typename":"OrderList","filter":{"state":null}}',
        data: {
          ...allOrderList,
          count: allOrderList.count + 1,
          items: [event.data.data?.onOrderCreated.order, ...allOrderList.items],
        },
      });

      console.log(apolloClient.cache);
    },
  });

  return query.data?.findOrderCount.orderCount.count;
}
