import { useApolloClient, useMutation } from '@apollo/client';
import { IOrder, ORDER_FRAGMENT_GQL } from '../fragments';
import {
  IUpdateOrderStateData,
  IUpdateOrderStateVariables,
  UPDATE_ORDER_STATE_GQL,
} from '../mutation';

export function useUpdateOrderStateCallback() {
  const apollo = useApolloClient();

  const [update] = useMutation<
    IUpdateOrderStateData,
    IUpdateOrderStateVariables
  >(UPDATE_ORDER_STATE_GQL, {
    optimisticResponse: (variables) => {
      const fragment: IOrder | null = apollo.cache.readFragment({
        fragment: ORDER_FRAGMENT_GQL,
        fragmentName: 'OrderFragment',
        id: `Order:{"orderId":"${variables.orderId}"}`,
      });
      if (!fragment) {
        throw new Error(`Order ${variables.orderId} not found in cache`);
      }

      return {
        updateOrderState: {
          order: {
            ...(fragment || {}),
            orderId: variables.orderId,
            state: variables.state,
          },
        },
      };
    },
  });

  return update;
}
