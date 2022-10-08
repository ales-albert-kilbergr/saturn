import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { HealthCheckController } from './controllers';
import { TerminusModule } from '@nestjs/terminus';
import { OrderManagementConfigModule, resolveAsyncConfig } from '../config';
import { WinstonModule } from 'nest-winston';

@Module({
  imports: [
    TerminusModule, //
    ConfigModule,
    OrderManagementConfigModule,
    WinstonModule.forRootAsync(resolveAsyncConfig('winstonConfig')),
  ],
  controllers: [HealthCheckController],
  providers: [AppService],
})
export class AppModule {}
