import { DynamicModule, Global, Module } from '@nestjs/common';
import { NestKafkaClientModule } from '@oms/nest-kafka-client';
import {
  createAsyncConfigProvider,
  INestjsAsyncConfig,
} from '@oms/nestjs-helpers';
import { OrderManagementConsumerConfig } from './order-management-consumer.config';
import { OrderManagementConsumerService } from './order-management-consumer.service';
import { OrderDataModule } from '@oms/order-data';

export type OrderManagementConsumerAsyncConfig =
  INestjsAsyncConfig<OrderManagementConsumerConfig>;

@Global()
@Module({})
export class OrderManagementConsumerModule {
  public static forRootAsync(
    asyncConfig: OrderManagementConsumerAsyncConfig
  ): DynamicModule {
    return {
      module: OrderManagementConsumerConfig,
      imports: [
        NestKafkaClientModule,
        OrderDataModule,
        ...(asyncConfig.imports || []),
      ],
      providers: [
        createAsyncConfigProvider<OrderManagementConsumerConfig>(
          OrderManagementConsumerConfig,
          asyncConfig.useFactory,
          asyncConfig.inject
        ),
        OrderManagementConsumerService,
      ],
    };
  }
}
