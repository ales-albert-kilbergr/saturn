import { Field, ObjectType } from '@nestjs/graphql';
import { Order, OrderItem } from '@oms/order-data';
import { OrderState } from '@oms/order-events';
import { OrderItemFragment } from './item.fragment';

@ObjectType(Order.name)
export class OrderFragment implements Order {
  @Field(() => OrderState)
  public state: OrderState;

  @Field(() => String)
  public orderId: string;

  @Field(() => [OrderItemFragment])
  public items: OrderItem[];

  @Field(() => String)
  public createdAt: string;

  @Field(() => String)
  public updatedAt: string;
}
