import { Field, ObjectType } from '@nestjs/graphql';
import { UInt } from '@oms/nestjs-helpers';
import { OrderState } from '@oms/order-events';

@ObjectType()
export class OrderCount {
  @Field(() => OrderState)
  public state: OrderState;

  @Field(() => UInt)
  public count: number;
}
