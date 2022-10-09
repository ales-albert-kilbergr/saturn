/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import {
  Abstract,
  FactoryProvider,
  ModuleMetadata,
  Type,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export type IAsyncConfigInject = Array<
  Type<any> | string | symbol | Abstract<any> | Function
>;

export interface INestjsAsyncConfig<CONFIG>
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args) => Promise<CONFIG>;
  inject?: IAsyncConfigInject;
}

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

export interface IConfigType<CONFIG> extends Type {
  name: string;
  create?: (...args: any[]) => Promise<CONFIG>;
}

export function createAsyncConfigProvider<CONFIG extends object>(
  Type: IConfigType<CONFIG>,
  useFactory: (...args) => CONFIG | Promise<CONFIG>,
  inject: IAsyncConfigInject = []
): FactoryProvider<CONFIG | Promise<CONFIG>> {
  return {
    provide: Type,
    useFactory: async (...args) =>
      await createNestjsModuleConfig<CONFIG>(Type, await useFactory(...args)),
    inject,
  };
}

/**
 * @throws {NestjsModuleConfigValidationException}
 */
export async function createNestjsModuleConfig<T extends object>(
  ConfigClass: ClassConstructor<T>,
  plain: Record<string, any> = {}
): Promise<T> {
  const instance = plainToInstance(ConfigClass, plain);
  const errors = await validate(instance);

  if (errors?.length > 0) {
    throw new NestjsModuleConfigValidationException(ConfigClass.name, errors);
  }

  return instance;
}

function formatExceptionMessage(configName: string, errors: ValidationError[]) {
  const reasons = errors
    .map((error) => {
      const constrains = Reflect.ownKeys(error.constraints)
        .reduce((lines, key: string) => {
          lines.push(`"${key}": ${error.constraints[key]}`);
          return lines;
        }, [])
        .join('\n    ');
      return `"${error.property}}:"\n    ${constrains}`;
    })
    .join('\n  ');

  return `[${configName}] validation failed!\n  ${reasons}`;
}

export class NestjsModuleConfigValidationException extends Error {
  constructor(
    public readonly configName: string,
    public readonly errors: ValidationError[],
    formatMessage: (
      configName: string,
      errors: ValidationError[]
    ) => string = formatExceptionMessage
  ) {
    super(formatMessage(configName, errors));
  }
}
