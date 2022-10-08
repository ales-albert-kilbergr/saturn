import { Module } from '@nestjs/common';
import { HealthCheckController } from './controllers';
import { TerminusModule } from '@nestjs/terminus';
import { OrderManagementConfigModule, resolveAsyncConfig } from '../config';
import { WinstonModule } from 'nest-winston';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderDataModule } from '@oms/order-data';

@Module({
  imports: [
    TerminusModule, //
    OrderManagementConfigModule,
    WinstonModule.forRootAsync(resolveAsyncConfig('winstonConfig')),
    MongooseModule.forRootAsync(resolveAsyncConfig('mongoConfig')),
    OrderDataModule,
  ],
  controllers: [HealthCheckController],
})
export class AppModule {}
