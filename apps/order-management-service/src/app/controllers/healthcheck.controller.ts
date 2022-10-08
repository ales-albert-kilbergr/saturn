import { Controller, Get, Logger } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorFunction,
} from '@nestjs/terminus';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('health')
export class HealthCheckController {
  private logger = new Logger(this.constructor.name);

  constructor(private healthCheck: HealthCheckService) {}

  @Get()
  @HealthCheck()
  @ApiExcludeEndpoint(true)
  async check(): Promise<HealthCheckResult> {
    try {
      const checks: HealthIndicatorFunction[] = [];

      return await this.healthCheck.check(checks);
    } catch (error) {
      this.logger.error(error.message, error?.stack);
      throw error;
    }
  }
}
