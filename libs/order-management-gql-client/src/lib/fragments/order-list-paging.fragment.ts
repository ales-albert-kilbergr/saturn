import { gql } from '@apollo/client';

export interface IOrderListPaging {
  limit: number;
  offset: number;
}

export const ORDER_LIST_PAGING_FRAGMENT_GQL = gql`
  fragment OrderListPagingFragment on OrderListPaging {
    limit
    offset
  }
`;
