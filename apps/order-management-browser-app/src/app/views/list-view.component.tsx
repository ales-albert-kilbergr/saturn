import {
  IOrder,
  useFindOpenOrderCount,
  useFindOrderCount,
  useUpdateOrderStateCallback,
  useWatchOrderListQuery,
} from '@oms/order-management-gql-client';
import { OrderList } from '@oms/order-management-ui';
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

  const subscriptCount = useFindOpenOrderCount();
  const openOrdersCountQuery = useFindOrderCount('OPEN');
  const inProgressOrdersCountQuery = useFindOrderCount('IN_PROGRESS');
  const completeOrdersCountQuery = useFindOrderCount('COMPLETE');

  return orders.data?.findOrderList.list ? (
    <OrderList
      list={orders.data?.findOrderList.list}
      onAssign={handleOrderAssign}
      onComplete={handleOrderCompleted}
      onFilter={handleListFilter}
      orderStateFilter={orderStateFilter}
      openOrdersCount={
        openOrdersCountQuery.data?.findOrderCount.orderCount.count
      }
      inProgressOrdersCount={
        inProgressOrdersCountQuery.data?.findOrderCount.orderCount.count
      }
      comleteOrdersCount={
        completeOrdersCountQuery.data?.findOrderCount.orderCount.count
      }
    />
  ) : null;
};

OrderListView.displayName = 'OrderListView';

OrderListView.defaultProps = {};
