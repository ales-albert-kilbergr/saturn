import { registerAs } from '@nestjs/config';
import { OrderManagementConsumerConfig } from '@oms/order-management-consumer';

export const kafkaConsumerConfig = registerAs(
  'kafkaConsumerConfig',
  () =>
    ({
      consumer: {
        groupId: process.env.KAFKA_CONSUMER_GROUP,
        allowAutoTopicCreation: true,
        sessionTimeout: 10000,
      },
      consumerRun: {
        autoCommit: true,
        autoCommitInterval: 5000,
        autoCommitThreshold: 100,
      },
    } as OrderManagementConsumerConfig)
);
