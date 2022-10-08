import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class OrderItemPrice {
  @Prop({
    type: Number,
    required: true,
  })
  public amount: number;

  @Prop({
    type: String,
    required: true,
  })
  public currency: string;
}

export const OrderItemPriceSchema =
  SchemaFactory.createForClass(OrderItemPrice);
