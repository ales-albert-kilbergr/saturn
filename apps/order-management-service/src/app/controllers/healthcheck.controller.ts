import { Controller, Get, Logger } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorFunction,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { KafkaConsumerHealthcheckIndicator } from '../services';

@Controller('health')
export class HealthCheckController {
  private logger = new Logger(this.constructor.name);

  constructor(
    private healthCheck: HealthCheckService,
    private mongooseHealth: MongooseHealthIndicator,
    private kakfaConsumerHealth: KafkaConsumerHealthcheckIndicator
  ) {}

  @Get()
  @HealthCheck()
  @ApiExcludeEndpoint(true)
  async check(): Promise<HealthCheckResult> {
    try {
      const checks: HealthIndicatorFunction[] = [
        () => this.mongooseHealth.pingCheck('mongodb'),
        () => this.kakfaConsumerHealth.isHealthy(),
      ];

      return await this.healthCheck.check(checks);
    } catch (error) {
      this.logger.error(error.message, error?.stack);
      throw error;
    }
  }
}
