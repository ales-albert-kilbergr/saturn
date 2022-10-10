import { OrderState } from '@oms/order-events';
import { Order } from './schemas';

export class OrderStateMachineException extends Error {
  constructor(
    public readonly currState: OrderState,
    public readonly nextState: OrderState
  ) {
    super(`Invalid state transition from "${currState}" to "${nextState}"`);
  }
}

export function orderStateMachine(order: Order, nextState: OrderState) {
  if (order.state === nextState) {
    return;
  }
  switch (order.state) {
    case OrderState.OPEN:
      if (nextState === OrderState.IN_PROGRESS) {
        order.state = nextState;
        return order;
      }
    // eslint-disable-next-line no-fallthrough
    case OrderState.IN_PROGRESS:
      if (nextState === OrderState.COMPLETE) {
        order.state = nextState;
        return order;
      }
    // eslint-disable-next-line no-fallthrough
    case OrderState.COMPLETE:
    default:
      throw new OrderStateMachineException(order.state, nextState);
  }
}
