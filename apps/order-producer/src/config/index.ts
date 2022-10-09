import { ConfigModule } from '@nestjs/config';
import { EnvironmentVariables } from './env-vars';
import { resolveAsyncModuleConfig } from '@oms/nestjs-helpers';
import { WinstonModuleOptions } from 'nest-winston';
import { winstonConfig } from './winston.config';
import { gqlApiConfig } from './gql.config';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { kafkaConfig } from './kafka.config';
import { KafkaConfig, ProducerConfig } from 'kafkajs';
import { kafkaProducerConfig } from './kafka-producer.config';

export interface IConfig extends EnvironmentVariables {
  winstonConfig: WinstonModuleOptions;
  gqlApiConfig: ApolloDriverConfig;
  kafkaConfig: KafkaConfig;
  kafkaProducerConfig: ProducerConfig;
}

export const OrderManagementConfigModule = ConfigModule.forRoot({
  cache: true,
  validate: EnvironmentVariables.Validator,
  load: [winstonConfig, gqlApiConfig, kafkaConfig, kafkaProducerConfig],
});

export function resolveAsyncConfig(key: keyof IConfig) {
  return resolveAsyncModuleConfig<IConfig>(key);
}
