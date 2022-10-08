import { OrderState } from '../order-state.enum';
import { IOrderItem } from './item.interface';

export interface IOrder {
  orderId: string;

  state: OrderState;

  items: IOrderItem[];
}
