import { ConfigModule } from '@nestjs/config';
import { EnvironmentVariables } from './env-vars';
import { resolveAsyncModuleConfig } from '@oms/nestjs-helpers';

export interface IConfig extends EnvironmentVariables {}

export const OrderManagementConfigModule = ConfigModule.forRoot({
  cache: true,
  validate: EnvironmentVariables.Validator,
  load: [],
});

export function resolveAsyncConfig(key: keyof IConfig) {
  return resolveAsyncModuleConfig<IConfig>(key);
}
