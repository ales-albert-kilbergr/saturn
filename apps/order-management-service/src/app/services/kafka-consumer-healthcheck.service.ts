import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaConsumerHealthcheckIndicator extends HealthIndicator {
  constructor(private moduleRef: ModuleRef) {
    super();
  }

  public async isHealthy(): Promise<HealthIndicatorResult> {
    try {
      const kafka = this.moduleRef.get<Kafka>(Kafka);

      await kafka.admin().describeCluster();
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
