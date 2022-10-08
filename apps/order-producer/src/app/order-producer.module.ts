import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { WinstonModule } from 'nest-winston';
import { OrderManagementConfigModule, resolveAsyncConfig } from '../config';

@Module({
  imports: [
    TerminusModule, //
    OrderManagementConfigModule,
    WinstonModule.forRootAsync(resolveAsyncConfig('winstonConfig')),
  ],
})
export class OrderProducerModule {}
