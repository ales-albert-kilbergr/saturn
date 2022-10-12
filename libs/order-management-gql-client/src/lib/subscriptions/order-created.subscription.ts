import { gql } from '@apollo/client';
import { IOrder, ORDER_FRAGMENT_GQL } from '../fragments';

export interface IOnOrderCreatedSubscription {
  onOrderCreated: {
    order: IOrder;
  };
}

export const ORDER_CREATED_SUBSCRIPTION = gql`
  subscription OnOrderCreated {
    onOrderCreated {
      order {
        ...OrderFragment
      }
    }
  }
  ${ORDER_FRAGMENT_GQL}
`;
