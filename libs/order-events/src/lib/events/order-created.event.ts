import { IOrder } from '../interfaces';
import { OrderBaseEvent } from './order-base.event';

export interface IOrderCreatedEventData {
  order: IOrder;
}

export class OrderCreatedEvent extends OrderBaseEvent {
  public static EVENT_TYPE = 'order.created';

  public readonly type = OrderCreatedEvent.EVENT_TYPE;

  constructor(public readonly data: IOrderCreatedEventData) {
    super();
  }
}
