import { Order } from '@oms/order-data';

export class OrderCreatedInternalEvent {
  constructor(public order: Order) {}
}
