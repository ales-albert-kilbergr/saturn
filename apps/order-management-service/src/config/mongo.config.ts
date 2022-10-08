import { registerAs } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongoConfig = registerAs(
  'mongoConfig',
  () =>
    ({
      uri: process.env.MONGO_URI,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      retryWrites: false,
      loggerLevel: process.env.MONGO_LOG_LEVEL || undefined,
      maxPoolSize: process.env.MONGO_MAX_POOL_SIZE || 20,
    } as MongooseModuleOptions)
);
