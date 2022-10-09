import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { WinstonModule } from 'nest-winston';
import { OrderManagementConfigModule, resolveAsyncConfig } from '../config';
import { HealthCheckController } from './controllers';
import { KafkaProducerProvider, KafkaProvider } from './kafka.providers';
import { MUTATIONS } from './mutations';
import { OrderProducerGraphqlModule } from './order-producer-graphql.module';
import { QUERIES } from './queries';
import { KafkaProducerHealthcheckIndicator } from './services';

@Module({
  imports: [
    TerminusModule, //
    OrderManagementConfigModule,
    WinstonModule.forRootAsync(resolveAsyncConfig('winstonConfig')),
    OrderProducerGraphqlModule,
  ],
  controllers: [HealthCheckController],
  providers: [
    ...QUERIES, //
    ...MUTATIONS,
    KafkaProvider,
    KafkaProducerProvider,
    KafkaProducerHealthcheckIndicator,
  ],
})
export class OrderProducerModule {}
