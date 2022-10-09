import { DynamicModule } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';
import {
  createAsyncConfigProvider,
  INestjsAsyncConfig,
} from '@oms/nestjs-helpers';
import { Kafka } from 'kafkajs';
import { NestKafkaClientConfig } from './nest-kafka-client.config';

export type NestKafkaClientAsyncConfig =
  INestjsAsyncConfig<NestKafkaClientConfig>;

@Global()
@Module({})
export class NestKafkaClientCoreModule {
  public static forRootAsync(
    asyncConfig: NestKafkaClientAsyncConfig
  ): DynamicModule {
    return {
      module: NestKafkaClientCoreModule,
      imports: [...asyncConfig.imports],
      providers: [
        createAsyncConfigProvider<NestKafkaClientConfig>(
          NestKafkaClientConfig,
          asyncConfig.useFactory,
          asyncConfig.inject
        ),
        {
          provide: Kafka,
          useFactory: (config: NestKafkaClientConfig) => {
            const kafka = new Kafka(config.kafka);

            return kafka;
          },
          inject: [NestKafkaClientConfig],
        },
      ],
      exports: [Kafka],
    };
  }
}

@Module({})
export class NestKafkaClientModule {
  public static forRootAsync(
    asyncConfig: NestKafkaClientAsyncConfig
  ): DynamicModule {
    return {
      module: NestKafkaClientModule,
      imports: [NestKafkaClientCoreModule.forRootAsync(asyncConfig)],
    };
  }
}
