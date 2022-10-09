import { Controller, Get, Logger } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckError,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorFunction,
} from '@nestjs/terminus';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { ModuleRef } from '@nestjs/core';
import { KAFKA_PRODUCER } from '../kafka.providers';
import { KafkaProducerHealthcheckIndicator } from '../services';

@Controller('health')
export class HealthCheckController {
  private logger = new Logger(this.constructor.name);

  constructor(
    private healthCheck: HealthCheckService,
    private kafkaProducerHealthcheck: KafkaProducerHealthcheckIndicator
  ) {}

  @Get()
  @HealthCheck()
  @ApiExcludeEndpoint(true)
  async check(): Promise<HealthCheckResult> {
    try {
      const checks: HealthIndicatorFunction[] = [
        () => this.kafkaProducerHealthcheck.isHealthy(),
      ];

      return await this.healthCheck.check(checks);
    } catch (error) {
      this.logger.error(error.message, error?.stack);
      throw error;
    }
  }
}
