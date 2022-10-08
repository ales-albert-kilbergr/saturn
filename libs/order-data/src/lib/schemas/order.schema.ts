import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderState } from '../order-state.enum';
import { OrderItem, OrderItemSchema } from './item.schema';

@Schema({
  timestamps: true,
})
export class Order extends Document {
  @Prop({
    type: String,
    required: true,
    index: true,
  })
  public orderId: string;

  @Prop({
    type: [OrderItemSchema],
    default: [],
  })
  public items: OrderItem[];

  @Prop({
    type: String,
    enum: OrderState,
  })
  public state: OrderState;
}

export const OrderInstanceSchema = SchemaFactory.createForClass(Order);

export const OrderModelDefinition: ModelDefinition = {
  name: Order.name,
  schema: OrderInstanceSchema,
  collection: Order.name.toLocaleLowerCase(),
};
