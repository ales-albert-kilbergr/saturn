import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { HealthCheckController } from './controllers';
import { TerminusModule } from '@nestjs/terminus';
import { OrderManagementConfigModule } from '../config';

@Module({
  imports: [
    TerminusModule, //
    ConfigModule,
    OrderManagementConfigModule,
  ],
  controllers: [HealthCheckController],
  providers: [AppService],
})
export class AppModule {}
