/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { ConfigModule, ConfigService } from '@nestjs/config';

export function resolveModuleConfig<CONFIG_PAYLOAD>(
  configName: keyof CONFIG_PAYLOAD
) {
  return (config: ConfigService<CONFIG_PAYLOAD>) =>
    config.get(configName as any);
}
/**
 *
 */
export function resolveAsyncModuleConfig<CONFIG_PAYLOAD>(
  configName: keyof CONFIG_PAYLOAD
) {
  return {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: resolveModuleConfig(configName),
  };
}
