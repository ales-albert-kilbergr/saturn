import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Order, OrderModelDefinition } from './schemas';
import { CqrsModule } from '@nestjs/cqrs';

export const ORDER_MODEL = Symbol.for('order.model');

@Module({
  imports: [MongooseModule.forFeature([OrderModelDefinition]), CqrsModule],
  providers: [
    {
      provide: ORDER_MODEL,
      useFactory: (model) => model,
      inject: [getModelToken(Order.name)],
    },
  ],
  exports: [ORDER_MODEL],
})
export class OrderDataModule {}
