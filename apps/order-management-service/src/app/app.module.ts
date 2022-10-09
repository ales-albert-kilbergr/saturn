import { Module } from '@nestjs/common';
import { HealthCheckController } from './controllers';
import { TerminusModule } from '@nestjs/terminus';
import { OrderManagementConfigModule, resolveAsyncConfig } from '../config';
import { WinstonModule } from 'nest-winston';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderDataModule } from '@oms/order-data';
import { KafkaConsumerHealthcheckIndicator } from './services';
import { OrderManagementGqlApiModule } from '@oms/order-management-gql-api';
import { NestKafkaClientModule } from '@oms/nest-kafka-client';
import { OrderManagementConsumerModule } from '@oms/order-management-consumer';

@Module({
  imports: [
    TerminusModule, //
    OrderManagementConfigModule,
    WinstonModule.forRootAsync(resolveAsyncConfig('winstonConfig')),
    MongooseModule.forRootAsync(resolveAsyncConfig('mongoConfig')),
    NestKafkaClientModule.forRootAsync(resolveAsyncConfig('kafkaConfig')),
    OrderDataModule,
    OrderManagementConsumerModule.forRootAsync(
      resolveAsyncConfig('kafkaConsumerConfig')
    ),
    OrderManagementGqlApiModule.forRootAsync(
      resolveAsyncConfig('gqlApiConfig')
    ),
  ],
  controllers: [HealthCheckController],
  providers: [KafkaConsumerHealthcheckIndicator],
})
export class AppModule {}
