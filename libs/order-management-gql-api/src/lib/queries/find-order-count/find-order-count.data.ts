import { Field, ObjectType } from '@nestjs/graphql';
import { OrderCount } from '../../fragments';

@ObjectType()
export class FindOrderCountData {
  @Field(() => OrderCount)
  public orderCount: OrderCount;
}
