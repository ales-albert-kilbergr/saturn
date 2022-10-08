import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  public MONGO_URI: string;
  @IsString()
  public MONGO_LOG_LEVEL;
  @IsString()
  public MONGO_MAX_POOL_SIZE;
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
