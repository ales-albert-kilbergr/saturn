import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import {
  IOrderCount,
  ORDER_COUNT_FRAGMENT_GQL,
  ORDER_FRAGMENT_GQL,
  ORDER_LIST_FRAGMENT_GQL,
  ORDER_STATISTICS_FRAGMENT_GQL,
  ORDER_STATISTIC_RECORD_FRAGMENT,
} from '../fragments';
import {
  FIND_ORDER_COUNT_QUERY,
  IFindOrderCountQueryData,
  IFindOrderCountQueryVariables,
} from '../queries';
import {
  IOnOrderCreatedSubscription,
  IOnOrderStateUpdatedSubscription,
  ORDER_CREATED_SUBSCRIPTION,
  ORDER_STATE_UPDATED_SUBSCRIPTION,
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

      const statistics = apolloClient.readFragment({
        fragment: ORDER_STATISTICS_FRAGMENT_GQL,
        fragmentName: 'OrderStatisticsFragment',
        id: 'OrderStatistics:{"__typename":"OrderStatistics"}',
      });

      if (statistics) {
        const lastRecord = statistics.records[statistics.records.length - 1];
        const bucketEndTime =
          new Date(lastRecord.timestamp).getTime() + statistics.bucketSize;
        if (event.data.data?.onOrderCreated.order) {
          if (
            bucketEndTime >=
            new Date(event.data.data?.onOrderCreated.order.createdAt).getTime()
          ) {
            apolloClient.writeFragment({
              fragment: ORDER_STATISTIC_RECORD_FRAGMENT,
              fragmentName: 'OrderStatisticRecordFragment',
              id: `OrderStatisticRecord:{"timestamp":"${lastRecord.timestamp}"}`,
              data: {
                ...lastRecord,
                count: lastRecord.count + 1,
                sum:
                  lastRecord.sum +
                  event.data.data?.onOrderCreated.order.items.reduce(
                    (sum, item) => {
                      return sum + item.price.amount;
                    },
                    0
                  ),
                last: event.data.data?.onOrderCreated.order.createdAt,
              },
            });
          } else {
            const newBucketBoundary = new Date(bucketEndTime + 1);
            const newFragment = {
              count: 1,
              sum: event.data.data?.onOrderCreated.order.items.reduce(
                (sum, item) => {
                  return sum + item.price.amount;
                },
                0
              ),
              first: event.data.data?.onOrderCreated.order.createdAt,
              last: event.data.data?.onOrderCreated.order.createdAt,
              timestamp: newBucketBoundary.toISOString(),
              __typename: 'OrderStatisticRecord',
            };
            apolloClient.writeFragment({
              fragment: ORDER_STATISTIC_RECORD_FRAGMENT,
              fragmentName: 'OrderStatisticRecordFragment',
              id: `OrderStatisticRecord:{"timestamp":"${newBucketBoundary.toISOString()}"}`,
              data: newFragment,
            });

            apolloClient.writeFragment({
              fragment: ORDER_STATISTICS_FRAGMENT_GQL,
              fragmentName: 'OrderStatisticsFragment',
              id: 'OrderStatistics:{"__typename":"OrderStatistics"}',
              data: {
                ...statistics,
                records: [...statistics.records, newFragment],
                to: newBucketBoundary.toISOString(),
              },
            });
          }
        }
      }
    },
  });

  return query.data?.findOrderCount.orderCount.count;
}

export function useFindInProgressOrderCount() {
  const query = useQuery<
    IFindOrderCountQueryData,
    IFindOrderCountQueryVariables
  >(FIND_ORDER_COUNT_QUERY, {
    variables: { state: 'IN_PROGRESS' },
  });
  const apolloClient = useApolloClient();
  useSubscription<IOnOrderStateUpdatedSubscription>(
    ORDER_STATE_UPDATED_SUBSCRIPTION,
    {
      onData: (event) => {
        if (
          event.data.data?.onOrderStateUpdated.patch.state !== 'IN_PROGRESS'
        ) {
          return;
        }
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
            count: (openOrdersCount?.count || 0) - 1,
          },
        });

        const inProgressOrdersCount = apolloClient.readFragment<IOrderCount>({
          fragment: ORDER_COUNT_FRAGMENT_GQL,
          fragmentName: 'OrderCountFragment',
          id: `OrderCount:{"state":"IN_PROGRESS"}`,
        });

        apolloClient.writeFragment({
          fragment: ORDER_COUNT_FRAGMENT_GQL,
          fragmentName: 'OrderCountFragment',
          id: `OrderCount:{"state":"IN_PROGRESS"}`,
          data: {
            ...inProgressOrdersCount,
            count: (inProgressOrdersCount?.count || 0) + 1,
          },
        });

        const order = apolloClient.readFragment({
          fragment: ORDER_FRAGMENT_GQL,
          fragmentName: 'OrderFragment',
          id: `Order:{"orderId":"${event.data.data?.onOrderStateUpdated.patch.orderId}"}`,
        });

        apolloClient.writeFragment({
          fragment: ORDER_FRAGMENT_GQL,
          fragmentName: 'OrderFragment',
          id: `Order:{"orderId":"${event.data.data?.onOrderStateUpdated.patch.orderId}"}`,
          data: {
            ...order,
            state: event.data.data?.onOrderStateUpdated.patch.state,
          },
        });

        const inProgressOrderList = apolloClient.readFragment({
          fragment: ORDER_LIST_FRAGMENT_GQL,
          fragmentName: 'OrderListFragment',
          id: 'OrderList:{"__typename":"OrderList","filter":{"state":"IN_PROGRESS"}}',
        });
        if (inProgressOrderList) {
          apolloClient.writeFragment({
            fragment: ORDER_LIST_FRAGMENT_GQL,
            fragmentName: 'OrderListFragment',
            id: 'OrderList:{"__typename":"OrderList","filter":{"state":"IN_PROGRESS"}}',
            data: {
              ...inProgressOrderList,
              count: inProgressOrderList.count + 1,
              items: [order, ...inProgressOrderList.items],
            },
          });
        }
      },
    }
  );

  return query.data?.findOrderCount.orderCount.count;
}

export function useFindCompleteOrderCount() {
  const query = useQuery<
    IFindOrderCountQueryData,
    IFindOrderCountQueryVariables
  >(FIND_ORDER_COUNT_QUERY, {
    variables: { state: 'COMPLETE' },
  });
  const apolloClient = useApolloClient();
  useSubscription<IOnOrderStateUpdatedSubscription>(
    ORDER_STATE_UPDATED_SUBSCRIPTION,
    {
      onData: (event) => {
        if (event.data.data?.onOrderStateUpdated.patch.state !== 'COMPLETE') {
          return;
        }

        const inProgressOrdersCount = apolloClient.readFragment<IOrderCount>({
          fragment: ORDER_COUNT_FRAGMENT_GQL,
          fragmentName: 'OrderCountFragment',
          id: `OrderCount:{"state":"IN_PROGRESS"}`,
        });

        apolloClient.writeFragment({
          fragment: ORDER_COUNT_FRAGMENT_GQL,
          fragmentName: 'OrderCountFragment',
          id: `OrderCount:{"state":"IN_PROGRESS"}`,
          data: {
            ...inProgressOrdersCount,
            count: (inProgressOrdersCount?.count || 0) - 1,
          },
        });

        const completeOrdersCount = apolloClient.readFragment<IOrderCount>({
          fragment: ORDER_COUNT_FRAGMENT_GQL,
          fragmentName: 'OrderCountFragment',
          id: `OrderCount:{"state":"COMPLETE"}`,
        });

        apolloClient.writeFragment({
          fragment: ORDER_COUNT_FRAGMENT_GQL,
          fragmentName: 'OrderCountFragment',
          id: `OrderCount:{"state":"COMPLETE"}`,
          data: {
            ...completeOrdersCount,
            count: (completeOrdersCount?.count || 0) + 1,
          },
        });

        const order = apolloClient.readFragment({
          fragment: ORDER_FRAGMENT_GQL,
          fragmentName: 'OrderFragment',
          id: `Order:{"orderId":"${event.data.data?.onOrderStateUpdated.patch.orderId}"}`,
        });

        apolloClient.writeFragment({
          fragment: ORDER_FRAGMENT_GQL,
          fragmentName: 'OrderFragment',
          id: `Order:{"orderId":"${event.data.data?.onOrderStateUpdated.patch.orderId}"}`,
          data: {
            ...order,
            state: event.data.data?.onOrderStateUpdated.patch.state,
          },
        });

        const completeOrderList = apolloClient.readFragment({
          fragment: ORDER_LIST_FRAGMENT_GQL,
          fragmentName: 'OrderListFragment',
          id: 'OrderList:{"__typename":"OrderList","filter":{"state":"COMPLETE"}}',
        });
        if (completeOrderList) {
          apolloClient.writeFragment({
            fragment: ORDER_LIST_FRAGMENT_GQL,
            fragmentName: 'OrderListFragment',
            id: 'OrderList:{"__typename":"OrderList","filter":{"state":"COMPLETE"}}',
            data: {
              ...completeOrderList,
              count: completeOrderList.count + 1,
              items: [order, ...completeOrderList.items],
            },
          });
        }
      },
    }
  );

  return query.data?.findOrderCount.orderCount.count;
}
