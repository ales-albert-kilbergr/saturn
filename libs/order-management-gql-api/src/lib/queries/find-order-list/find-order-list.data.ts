import { Field, ObjectType } from '@nestjs/graphql';
import { OrderListFragment } from '../../fragments/list.fragment';

@ObjectType()
export class FindOrderListData {
  @Field(() => OrderListFragment)
  public list: OrderListFragment;
}
