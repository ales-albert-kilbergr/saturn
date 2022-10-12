import { gql } from '@apollo/client';
import { IOrderCount, ORDER_COUNT_FRAGMENT_GQL } from '../fragments';

export interface IFindOrderCountQueryData {
  findOrderCount: {
    orderCount: IOrderCount;
  };
}

export interface IFindOrderCountQueryVariables {
  state: string | null;
}

export const FIND_ORDER_COUNT_QUERY = gql`
  query FindOrderCount($state: OrderState) {
    findOrderCount(state: $state) {
      orderCount {
        ...OrderCountFragment
      }
    }
  }
  ${ORDER_COUNT_FRAGMENT_GQL}
`;
