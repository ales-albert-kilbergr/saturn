import * as React from 'react';
import { IOrder, IOrderList } from '@oms/order-management-gql-client';
import { OrderListRow2 } from './order-list-row.component';
import { ListRow } from '../list-row/list-row.component';
import {
  OrderActionCell,
  OrderCreatedAtCell,
  OrderItemsCell,
  OrderPriceCell,
  OrderStateLabelCell,
} from '../order-list-cell/order-list-cell.component';
import { ColumnHeading } from '../column-heading/column-heading.component';
import { OrderListRow } from '../list-order-row/list-order-row.component';
import Box from '@mui/material/Box';
import { OrderStateFilter } from '../order-state-filter/order-state-filter.component';

export interface OrderListProps {
  list: IOrderList;
  onAssign: (order: IOrder) => void;
  onComplete: (order: IOrder) => void;
  onFilter: (orderState?: string) => void;
  orderStateFilter?: string | null;
  openOrdersCount?: number;
  inProgressOrdersCount?: number;
  comleteOrdersCount?: number;
}

export type OrderListComponent = React.FC<OrderListProps>;

/**
 *
 */
export const OrderList: OrderListComponent = (props) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex' }}>
        <OrderStateFilter
          count={props.list.count}
          orderState={undefined}
          onFilterClick={props.onFilter}
          isActive={!props.orderStateFilter}
        >
          All
        </OrderStateFilter>
        <OrderStateFilter
          count={props.openOrdersCount || 0}
          orderState="OPEN"
          onFilterClick={props.onFilter}
          isActive={props.orderStateFilter === 'OPEN'}
        >
          Open
        </OrderStateFilter>
        <OrderStateFilter
          count={props.inProgressOrdersCount || 0}
          orderState="IN_PROGRESS"
          onFilterClick={props.onFilter}
          isActive={props.orderStateFilter === 'IN_PROGRESS'}
        >
          In Progress
        </OrderStateFilter>
        <OrderStateFilter
          count={props.comleteOrdersCount || 0}
          orderState="COMPLETE"
          onFilterClick={props.onFilter}
          isActive={props.orderStateFilter === 'COMPLETE'}
        >
          Complete
        </OrderStateFilter>
      </Box>
      <ListRow sx={{ background: '#f3f3f3' }}>
        <OrderCreatedAtCell>
          <ColumnHeading sortable={true}>Created At</ColumnHeading>
        </OrderCreatedAtCell>
        <OrderItemsCell>
          <ColumnHeading>Items count</ColumnHeading>
        </OrderItemsCell>
        <OrderStateLabelCell>
          <ColumnHeading sortable={true}>State</ColumnHeading>
        </OrderStateLabelCell>
        <OrderPriceCell>
          <ColumnHeading>Price</ColumnHeading>
        </OrderPriceCell>
        <OrderActionCell>
          <ColumnHeading>Action</ColumnHeading>
        </OrderActionCell>
      </ListRow>

      <Box sx={{ overflowY: 'scroll', flex: '1' }}>
        {props.list.items.slice(0, 100).map((order) => (
          <OrderListRow
            key={order.orderId}
            order={order}
            onAssigne={props.onAssign}
            onComplete={props.onComplete}
          />
        ))}
      </Box>
    </Box>
  );
};

OrderList.displayName = 'OrderList';

OrderList.defaultProps = {};
