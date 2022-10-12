import { gql, TypePolicy } from '@apollo/client';
import { ORDER_ITEM_FRAGMENT_GQL } from './order-item.fragment';
import {
  IOrderListFilter,
  ORDER_LIST_FILTER_FRAGMENT_GQL,
} from './order-list-filter.fragment';
import {
  IOrderListPaging,
  ORDER_LIST_PAGING_FRAGMENT_GQL,
} from './order-list-paging.fragment';
import { IOrder, ORDER_FRAGMENT_GQL } from './order.fragment';

export interface IOrderList {
  items: IOrder[];
  filter: IOrderListFilter;
  paging: IOrderListPaging;
  count: number;
}

export const ORDER_LIST_FRAGMENT_GQL = gql`
  fragment OrderListFragment on OrderList {
    items {
      ...OrderFragment
    }
    filter {
      ...OrderListFilterFragment
    }
    paging {
      ...OrderListPagingFragment
    }
    count
  }
  ${ORDER_LIST_FILTER_FRAGMENT_GQL}
  ${ORDER_FRAGMENT_GQL}
  ${ORDER_LIST_PAGING_FRAGMENT_GQL}
`;

export const ORDER_LIST_TYPE_POLICY: TypePolicy = {
  keyFields: ['__typename', 'filter', ['state']],
};
