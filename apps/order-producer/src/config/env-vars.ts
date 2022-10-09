import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  public APP_PORT: string;

  @IsString()
  public KAFKA_CLIENT_BROKER: string;

  @IsString()
  public KAFKA_CLIENT_CLIENT_ID: string;

  /**
   *
   */
  public static Validator(config) {
    const configTransformed = plainToInstance(EnvironmentVariables, config);

    const errors = validateSync(configTransformed);

    if (errors.length > 0) {
      throw errors;
    }

    return configTransformed;
  }
}
