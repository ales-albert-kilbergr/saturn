import { gql } from '@apollo/client';
import {
  IOrderItemPrice,
  ORDER_ITEM_PRICE_FRAGMENT_GQL,
} from './order-item-price.fragment';

export interface IOrderItem {
  price: IOrderItemPrice;
  name: string;
  count: number;
}

export const ORDER_ITEM_FRAGMENT_GQL = gql`
  fragment OrderItemFragment on OrderItem {
    price {
      ...OrderItemPriceFragment
    }
    name
    count
  }
  ${ORDER_ITEM_PRICE_FRAGMENT_GQL}
`;
