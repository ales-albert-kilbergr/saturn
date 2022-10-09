import { IOrder } from '../interfaces';
import { OrderBaseEvent } from './order-base.event';
import * as uuid from 'uuid';
import { OrderState } from '../order-state.enum';

export interface IOrderCreatedEventData {
  order: Omit<IOrder, 'orderId' | 'state'> & {
    orderId?: string;
    state?: OrderState;
  };
}

export class OrderCreatedEvent extends OrderBaseEvent {
  public static EVENT_TYPE = 'order.created';

  public readonly type = OrderCreatedEvent.EVENT_TYPE;

  constructor(public readonly data: IOrderCreatedEventData) {
    super();
  }

  public static create(data: IOrderCreatedEventData) {
    return new OrderCreatedEvent({
      ...data,
      order: {
        ...data.order,
        state: data.order.state || OrderState.OPEN,
        orderId: data.order.orderId || uuid.v4(),
      },
    });
  }
}
