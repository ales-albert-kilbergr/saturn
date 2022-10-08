import { IOrderItemPrice } from './price.interface';

export interface IOrderItem {
  name: string;
  count: number;
  price: IOrderItemPrice;
}
