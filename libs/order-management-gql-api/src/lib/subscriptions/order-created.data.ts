import { Field, ObjectType } from '@nestjs/graphql';
import { OrderFragment } from '../fragments';

@ObjectType()
export class OrderCreatedData {
  @Field(() => OrderFragment, { nullable: true })
  public order: OrderFragment;
}
