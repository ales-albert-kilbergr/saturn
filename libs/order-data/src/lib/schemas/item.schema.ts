import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderItemPrice, OrderItemPriceSchema } from './price.schema';

@Schema()
export class OrderItem {
  @Prop({
    type: String,
    required: true,
  })
  public name: string;

  @Prop({
    type: Number,
    required: true,
    default: 1,
  })
  public count: number;

  @Prop({
    type: OrderItemPriceSchema,
    required: true,
  })
  public price: OrderItemPrice;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
