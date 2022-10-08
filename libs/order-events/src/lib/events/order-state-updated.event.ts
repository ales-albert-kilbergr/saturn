import { OrderState } from '../order-state.enum';
import { OrderBaseEvent } from './order-base.event';

export interface IOrderStatusUpdatedEventData {
  orderId: string;
  state: OrderState;
}

export class OrderStateUpdatedEvent extends OrderBaseEvent {
  public static EVENT_TYPE = 'order.status-updated';

  public readonly type = OrderStateUpdatedEvent.EVENT_TYPE;

  constructor(public readonly data: IOrderStatusUpdatedEventData) {
    super();
  }
}
