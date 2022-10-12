import { gql } from '@apollo/client';
import { ORDER_LIST_FRAGMENT_GQL, IOrderList } from '../fragments';

export interface IFindOrderListQueryData {
  findOrderList: {
    list: IOrderList;
  };
}

export interface IFindOrderListQueryVariables {
  filter?: {
    state: string | null;
  };
}

export const FIND_ORDER_LIST_QUERY = gql`
  query FindOrderList($filter: FindOrderListFilterInput) {
    findOrderList(filter: $filter) {
      list {
        ...OrderListFragment
      }
    }
  }
  ${ORDER_LIST_FRAGMENT_GQL}
`;
