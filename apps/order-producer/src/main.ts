/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { OrderProducerModule } from './app/order-producer.module';
import { IConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(OrderProducerModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  // Inject custom logger library, which handle Dev/Prod logging
  // differently. The `WINSTON_LOGGER_PROVIDER` configures logger transports,
  // where app logs are stored.
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const configService = app.get<ConfigService<IConfig>>(ConfigService);
  const port = configService.get('APP_PORT') || 3333;

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
