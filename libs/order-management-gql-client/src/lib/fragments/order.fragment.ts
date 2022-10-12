import { gql, TypePolicy } from '@apollo/client';
import { IOrderItem, ORDER_ITEM_FRAGMENT_GQL } from './order-item.fragment';

export interface IOrder {
  orderId: string;
  state: string;
  items: IOrderItem[];
  createdAt: string;
  updatedAt: string;
}

export const ORDER_FRAGMENT_GQL = gql`
  fragment OrderFragment on Order {
    orderId
    state
    createdAt
    updatedAt
    items {
      ...OrderItemFragment
    }
  }
  ${ORDER_ITEM_FRAGMENT_GQL}
`;

export const ORDER_TYPE_POLICY: TypePolicy = {
  keyFields: ['orderId'],
};
