import { Field, ObjectType } from '@nestjs/graphql';
import { OrderState } from '@oms/order-events';

@ObjectType()
export class OrderStateUpdate {
  @Field()
  public orderId: string;

  @Field(() => OrderState)
  public state: OrderState;
}

@ObjectType()
export class OnOrderStateUpdatedData {
  @Field(() => OrderStateUpdate)
  public patch: OrderStateUpdate;
}
