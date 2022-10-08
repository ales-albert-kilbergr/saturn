import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { HealthCheckController } from './controllers';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  controllers: [HealthCheckController],
  providers: [AppService],
})
export class AppModule {}
