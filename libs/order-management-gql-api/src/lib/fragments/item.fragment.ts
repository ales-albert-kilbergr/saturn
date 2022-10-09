import { Field, ObjectType } from '@nestjs/graphql';
import { OrderItem, OrderItemPrice } from '@oms/order-data';
import { OrderItemPriceFragment } from './price.fragment';

@ObjectType(OrderItem.name)
export class OrderItemFragment implements OrderItem {
  @Field(() => Number)
  public count: number;

  @Field(() => String)
  public name: string;

  @Field(() => OrderItemPriceFragment)
  public price: OrderItemPrice;
}
