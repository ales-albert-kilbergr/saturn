import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { OrderState } from '../order-state.enum';
import { OrderItem, OrderItemSchema } from './item.schema';

export type OrderModel = mongoose.Model<Order>;

@Schema({
  timestamps: true,
})
export class Order {
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

export const OrderSchema = SchemaFactory.createForClass(Order);

export const OrderModelDefinition: ModelDefinition = {
  name: Order.name,
  schema: OrderSchema,
  collection: Order.name.toLocaleLowerCase(),
};
