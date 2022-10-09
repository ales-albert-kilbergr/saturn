import { Field, ObjectType } from '@nestjs/graphql';
import { UInt } from '@oms/nestjs-helpers';
import { Order } from '@oms/order-data';
import { OrderState } from '@oms/order-events';
import { OrderFragment } from './order.fragment';

@ObjectType('OrderListPaging')
export class OrderListPaging {
  @Field(() => UInt)
  public limit: number;

  @Field(() => UInt)
  public offset: number;
}

@ObjectType('OrderListFilter')
export class OrderListFilterFragment {
  @Field(() => OrderState, { nullable: true })
  public state?: OrderState;
}

@ObjectType('OrderList')
export class OrderListFragment {
  @Field(() => [OrderFragment])
  public items: Order[];

  @Field(() => OrderListPaging)
  public paging: OrderListPaging;

  @Field(() => Number)
  public count: number;

  @Field(() => OrderListFilterFragment, { nullable: true })
  public filter?: OrderListFilterFragment;
}
