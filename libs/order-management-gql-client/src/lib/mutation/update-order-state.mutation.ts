import { gql } from '@apollo/client';
import { IOrder, ORDER_FRAGMENT_GQL } from '../fragments';

export interface IUpdateOrderStateVariables {
  orderId: string;
  state: string;
}

export interface IUpdateOrderStateData {
  updateOrderState: {
    order: IOrder;
  };
}

export const UPDATE_ORDER_STATE_GQL = gql`
  mutation UpdateOrderState($orderId: String!, $state: OrderState!) {
    updateOrderState(orderId: $orderId, state: $state) {
      order {
        ...OrderFragment
      }
    }
  }
  ${ORDER_FRAGMENT_GQL}
`;
