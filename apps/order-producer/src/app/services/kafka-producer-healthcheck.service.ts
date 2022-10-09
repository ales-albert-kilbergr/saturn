import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { Producer } from 'kafkajs';
import { KAFKA_PRODUCER } from '../kafka.providers';

@Injectable()
export class KafkaProducerHealthcheckIndicator extends HealthIndicator {
  constructor(private moduleRef: ModuleRef) {
    super();
  }

  public async isHealthy(): Promise<HealthIndicatorResult> {
    try {
      const producer = this.moduleRef.get<Producer>(KAFKA_PRODUCER);

      await producer.send({
        topic: 'saturn.order-producer.healthcheck.v1',
        messages: [
          {
            key: 'staturn.order-producer',
            value: JSON.stringify({
              type: 'saturn.order-producer.healthcheck',
            }),
          },
        ],
      });

      return this.getStatus('kafka.producer', true);
    } catch (error) {
      console.error(error);
      throw new HealthCheckError(
        `Cannot produce events to kafka!` +
          `Service "OrderProducer" is not healthy.`,
        this.getStatus('kafka.producer', false)
      );
    }
  }
}
