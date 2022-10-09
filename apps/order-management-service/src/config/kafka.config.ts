import { registerAs } from '@nestjs/config';
import { KafkaConfig } from 'kafkajs';
import { environment } from '../environments/environment';
import { NestKafkaClientConfig } from '@oms/nest-kafka-client';

export const kafkaConfig = registerAs('kafkaConfig', () => {
  const kafka = {
    brokers: [process.env.KAFKA_CLIENT_BROKER],
    clientId: process.env.KAFKA_CLIENT_CLIENT_ID,
    logLevel: environment.kafkaClientLogLevel,
    retry: {
      retries: 3,
    },
    connectionTimeout: 45000,
  } as KafkaConfig;

  return {
    kafka,
  } as NestKafkaClientConfig;
});
