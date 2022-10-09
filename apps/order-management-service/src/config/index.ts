import { ConfigModule } from '@nestjs/config';
import { EnvironmentVariables } from './env-vars';
import { resolveAsyncModuleConfig } from '@oms/nestjs-helpers';
import { WinstonModuleOptions } from 'nest-winston';
import { winstonConfig } from './winston.config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { mongoConfig } from './mongo.config';
import { gqlApiConfig } from './gql.config';
import { kafkaConfig } from './kafka.config';
import { OrderManagementGqlConfig } from '@oms/order-management-gql-api';
import { NestKafkaClientConfig } from '@oms/nest-kafka-client';
import { kafkaConsumerConfig } from './kafka-consumer.config';
import { OrderManagementConsumerConfig } from '@oms/order-management-consumer';

export interface IConfig extends EnvironmentVariables {
  winstonConfig: WinstonModuleOptions;
  mongoConfig: MongooseModuleOptions;
  gqlApiConfig: OrderManagementGqlConfig;
  kafkaConfig: NestKafkaClientConfig;
  kafkaConsumerConfig: OrderManagementConsumerConfig;
}

export const OrderManagementConfigModule = ConfigModule.forRoot({
  cache: true,
  validate: EnvironmentVariables.Validator,
  load: [
    winstonConfig,
    mongoConfig,
    gqlApiConfig,
    kafkaConfig,
    kafkaConsumerConfig,
  ],
});

export function resolveAsyncConfig(key: keyof IConfig) {
  return resolveAsyncModuleConfig<IConfig>(key);
}
