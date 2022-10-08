import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthCheckController } from './controllers';
import { TerminusModule } from '@nestjs/terminus';
import { OrderManagementConfigModule, resolveAsyncConfig } from '../config';
import { WinstonModule } from 'nest-winston';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TerminusModule, //
    OrderManagementConfigModule,
    WinstonModule.forRootAsync(resolveAsyncConfig('winstonConfig')),
    MongooseModule.forRootAsync(resolveAsyncConfig('mongoConfig')),
  ],
  controllers: [HealthCheckController],
  providers: [AppService],
})
export class AppModule {}
