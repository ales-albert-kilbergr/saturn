import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModelDefinition } from './schemas';

@Module({
  imports: [MongooseModule.forFeature([OrderModelDefinition])],
  providers: [],
  exports: [],
})
export class OrderDataModule {}
