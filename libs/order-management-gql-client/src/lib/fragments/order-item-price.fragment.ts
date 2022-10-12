import { gql } from '@apollo/client';

export interface IOrderItemPrice {
  amount: number;
  currency: string;
}

export const ORDER_ITEM_PRICE_FRAGMENT_GQL = gql`
  fragment OrderItemPriceFragment on OrderItemPrice {
    amount
    currency
  }
`;
