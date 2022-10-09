import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLError } from 'graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IConfig } from '../config';

export const OrderProducerGraphqlModule = GraphQLModule.forRootAsync({
  driver: ApolloDriver,
  imports: [ConfigModule],
  useFactory: (config: ConfigService<IConfig>) => {
    const gqlApiConfig = config.get('gqlApiConfig');
    return {
      context: ({ req, res }) => ({ req, res }),
      formatError: (error: GraphQLError) => {
        return {
          ...error,
          typename: error.extensions?.__typename || '',
          code: error.extensions?.code,
          extensions: {
            ...error.extensions,
            origError: gqlApiConfig.debug ? error.extensions.origError : null,
          },
        };
      },
      ...gqlApiConfig,
    };
  },
  inject: [ConfigService],
});
