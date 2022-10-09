import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfig } from '../config';
import { Kafka } from 'kafkajs';

export const KafkaProvider: FactoryProvider = {
  provide: Kafka,
  useFactory: (config: ConfigService<IConfig>) => {
    const kafka = new Kafka(config.get('kafkaConfig'));
    console.log(config.get('kafkaConfig'));
    return kafka;
  },
  inject: [ConfigService],
};

export const KAFKA_PRODUCER = Symbol.for('KAFKA_PRODUCER');

export const KafkaProducerProvider: FactoryProvider = {
  provide: KAFKA_PRODUCER,
  useFactory: async (config: ConfigService<IConfig>, kafka: Kafka) => {
    const producer = kafka.producer(config.get('kafkaProducerConfig'));

    await producer.connect();

    return producer;
  },
  inject: [ConfigService, Kafka],
};
