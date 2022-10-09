import { registerAs } from '@nestjs/config';
import { Partitioners, ProducerConfig } from 'kafkajs';

export const kafkaProducerConfig = registerAs(
  'kafkaProducerConfig',
  () =>
    ({
      allowAutoTopicCreation: true,
      createPartitioner: Partitioners.LegacyPartitioner,
    } as ProducerConfig)
);
