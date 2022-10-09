import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrderProducerStatusFragment {
  @Field()
  public health: boolean;
}
