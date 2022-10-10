import { Field, ObjectType } from '@nestjs/graphql';
import { Order } from '@oms/order-data';
import { OrderFragment } from '../../fragments';

@ObjectType()
export class UpdateOrderStateData {
  @Field(() => OrderFragment)
  public order: Order;
}
