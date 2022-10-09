import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OrderItemPriceInput {
  @Field(() => String)
  public currency: string;

  @Field(() => Number)
  public amount: number;
}

@InputType()
export class OrderItemInput {
  @Field(() => String)
  public name: string;

  @Field(() => Number)
  public count: number;

  @Field(() => OrderItemPriceInput)
  public price: OrderItemPriceInput;
}

@InputType()
export class CreateOrderInput {
  @Field(() => String, { nullable: true })
  public orderId: string;

  @Field(() => [OrderItemInput])
  public items: OrderItemInput[];
}
