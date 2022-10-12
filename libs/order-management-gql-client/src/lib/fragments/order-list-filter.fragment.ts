import { gql } from '@apollo/client';

export interface IOrderListFilter {
  state?: string;
}

export const ORDER_LIST_FILTER_FRAGMENT_GQL = gql`
  fragment OrderListFilterFragment on OrderListFilter {
    state
  }
`;
