import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateOrderData {
  @Field()
  public dummy: boolean;
}
