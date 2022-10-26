import { gql } from '@apollo/client';

export interface IOnOrderStateUpdatedSubscription {
  onOrderStateUpdated: {
    patch: {
      orderId: string;
      state: string;
    };
  };
}

export const ORDER_STATE_UPDATED_SUBSCRIPTION = gql`
  subscription OnOrderCreated {
    onOrderStateUpdated {
      patch {
        orderId
        state
      }
    }
  }
`;
