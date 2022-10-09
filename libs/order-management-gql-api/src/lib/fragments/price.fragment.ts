import { Field, ObjectType } from '@nestjs/graphql';
import { OrderItemPrice } from '@oms/order-data';

@ObjectType(OrderItemPrice.name)
export class OrderItemPriceFragment implements OrderItemPrice {
  @Field(() => Number)
  public amount: number;

  @Field(() => String)
  public currency: string;
}
