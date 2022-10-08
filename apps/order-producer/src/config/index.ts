import { ConfigModule } from '@nestjs/config';
import { EnvironmentVariables } from './env-vars';
import { resolveAsyncModuleConfig } from '@oms/nestjs-helpers';
import { WinstonModuleOptions } from 'nest-winston';
import { winstonConfig } from './winston.config';

export interface IConfig extends EnvironmentVariables {
  winstonConfig: WinstonModuleOptions;
}

export const OrderManagementConfigModule = ConfigModule.forRoot({
  cache: true,
  validate: EnvironmentVariables.Validator,
  load: [winstonConfig],
});

export function resolveAsyncConfig(key: keyof IConfig) {
  return resolveAsyncModuleConfig<IConfig>(key);
}
