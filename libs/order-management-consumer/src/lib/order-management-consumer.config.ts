import { ConsumerConfig, ConsumerRunConfig } from 'kafkajs';

export class OrderManagementConsumerConfig {
  consumer: ConsumerConfig;
  consumerRun?: ConsumerRunConfig;
}
