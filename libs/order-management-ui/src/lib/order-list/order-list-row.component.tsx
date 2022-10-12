import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IOrder } from '@oms/order-management-gql-client';
import { Price } from '../price/price.component';
import { OrderLabel } from '../order-label/order-label.component';
import {
  OrderActionCell,
  OrderCreatedAtCell,
  OrderItemsCell,
  OrderPriceCell,
  OrderStateCell,
  OrderStateLabelCell,
} from '../order-list-cell/order-list-cell.component';

export interface IOrderListRowProps {
  order: IOrder;
  onAssigne: (order: IOrder) => void;
  onComplete: (order: IOrder) => void;
}

export type OrderListRow2Component = React.FC<IOrderListRowProps>;

export const OrderListRow2: OrderListRow2Component = (props) => {
  const onAssignClb = React.useCallback(() => {
    props.onAssigne(props.order);
  }, [props.order, props.onAssigne]);

  const onCompleteClb = React.useCallback(() => {
    props.onComplete(props.order);
  }, [props.order, props.onComplete]);

  const stateColor = React.useMemo(() => {
    switch (props.order.state) {
      case 'COMPLETE':
        return 'green';
      case 'IN_PROGRESS':
        return 'blue';
      default:
        return 'grey';
    }
  }, [props.order.state]);

  const computedPrice = React.useMemo(() => {
    return props.order.items.reduce(
      (sum, item) => sum + item.count * item.price.amount,
      0
    );
  }, [props.order]);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '48px',
        alignItems: 'center',
        borderBottom: '1px solid #e7e7e7',
      }}
    >
      <OrderCreatedAtCell>{props.order.createdAt}</OrderCreatedAtCell>
      <OrderItemsCell>Items: {props.order.items.length}</OrderItemsCell>
      <OrderStateLabelCell>
        <OrderLabel label={props.order.state} />
      </OrderStateLabelCell>
      <OrderPriceCell>
        <Price amount={computedPrice} />
      </OrderPriceCell>
      <OrderActionCell sx={{ width: '115px' }}>
        {props.order.state === 'OPEN' && (
          <Button
            sx={{ width: '100%' }}
            variant="outlined"
            onClick={onAssignClb}
          >
            Asign
          </Button>
        )}
        {props.order.state === 'IN_PROGRESS' && (
          <Button variant="contained" onClick={onCompleteClb}>
            Complete
          </Button>
        )}
      </OrderActionCell>
    </Box>
  );
};

OrderListRow2.displayName = 'OrderListRow';

OrderListRow2.defaultProps = {};
