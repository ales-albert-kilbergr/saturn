import { Field, InputType } from '@nestjs/graphql';
import { UInt } from '@oms/nestjs-helpers';
import { OrderState } from '@oms/order-events';

@InputType()
export class FindOrderListPagingInput {
  @Field(() => UInt, { nullable: true, defaultValue: 0 })
  public offset: number;

  @Field(() => UInt, { nullable: true, defaultValue: 100 })
  public limit: number;
}

@InputType()
export class FindOrderListFilterInput {
  @Field(() => OrderState, { nullable: true })
  public state?: OrderState;
}
