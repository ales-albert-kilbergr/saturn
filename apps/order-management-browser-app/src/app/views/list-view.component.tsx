import {
  IOrder,
  useFindCompleteOrderCount,
  useFindInProgressOrderCount,
  useFindOpenOrderCount,
  useFindOrderCount,
  useFindOrderStatistics,
  useUpdateOrderStateCallback,
  useWatchOrderListQuery,
} from '@oms/order-management-gql-client';
import { OrderList, OrderTimelineChart } from '@oms/order-management-ui';
import * as React from 'react';

export interface IOrderListViewProps {}

export type OrderListViewComponent = React.FC<IOrderListViewProps>;

export const OrderListView: OrderListViewComponent = (props) => {
  const orders = useWatchOrderListQuery();
  const updateOrderState = useUpdateOrderStateCallback();
  const [orderStateFilter, setOrderStateFilter] = React.useState<string | null>(
    null
  );

  const handleOrderAssign = React.useCallback(
    (order: IOrder) => {
      updateOrderState({
        variables: {
          orderId: order.orderId,
          state: 'IN_PROGRESS',
        },
      });
    },
    [updateOrderState]
  );

  const handleOrderCompleted = React.useCallback(
    (order: IOrder) => {
      updateOrderState({
        variables: {
          orderId: order.orderId,
          state: 'COMPLETE',
        },
      });
    },
    [updateOrderState]
  );

  const handleListFilter = React.useCallback(
    (orderState?: string) => {
      setOrderStateFilter(orderState || null);
      if (orderState) {
        orders.refetch({
          filter: {
            state: orderState,
          },
        });
      } else {
        orders.refetch({
          filter: {
            state: null,
          },
        });
      }
    },
    [orders]
  );

  const to = React.useMemo(() => new Date(), []);
  to.setMinutes(to.getMinutes() + 10);
  const from = React.useMemo(() => {
    const date = new Date();
    date.setHours(to.getHours() - 12);
    return date;
  }, [to]);
  const statistics = useFindOrderStatistics({
    filter: {
      to,
      from,
      bucketSize: 1000 * 60 * 10, // 10 minutes
    },
  });

  const openOrdersCount = useFindOpenOrderCount();
  const inProgressOrdersCount = useFindInProgressOrderCount();
  const completeOrdersCount = useFindCompleteOrderCount();

  return orders.data?.findOrderList.list ? (
    <>
      {statistics.data?.findOrderStatistics.statistics && (
        <OrderTimelineChart
          statistics={statistics.data?.findOrderStatistics.statistics}
        />
      )}
      <OrderList
        list={orders.data?.findOrderList.list}
        onAssign={handleOrderAssign}
        onComplete={handleOrderCompleted}
        onFilter={handleListFilter}
        orderStateFilter={orderStateFilter}
        openOrdersCount={openOrdersCount}
        inProgressOrdersCount={inProgressOrdersCount}
        comleteOrdersCount={completeOrdersCount}
      />
    </>
  ) : null;
};

OrderListView.displayName = 'OrderListView';

OrderListView.defaultProps = {};
