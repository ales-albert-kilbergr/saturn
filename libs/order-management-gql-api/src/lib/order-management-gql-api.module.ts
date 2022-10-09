import { DynamicModule, Global, Module } from '@nestjs/common';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLError } from 'graphql';
import {
  createAsyncConfigProvider,
  INestjsAsyncConfig,
} from '@oms/nestjs-helpers';
import { OrderManagementGqlConfig } from './order-management-gql.config';
import { QUERIES } from './queries';
import { OrderDataModule } from '@oms/order-data';
import { OrderState } from '@oms/order-events';

export type OrderMamagementGqlApiAsyncConfig =
  INestjsAsyncConfig<OrderManagementGqlConfig>;

registerEnumType(OrderState, {
  name: 'OrderState',
});

@Global()
@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class OrderManagementGqlApiModule {
  public static forRootAsync(
    asyncConfig: OrderMamagementGqlApiAsyncConfig
  ): DynamicModule {
    return {
      module: OrderManagementGqlApiModule,
      imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
          driver: ApolloDriver,
          useFactory: (config: OrderManagementGqlConfig) => {
            return {
              context: ({ req, res }) => ({ req, res }),
              formatError: (error: GraphQLError) => {
                return {
                  ...error,
                  typename: error.extensions?.__typename || '',
                  code: error.extensions?.code,
                  extensions: {
                    ...error.extensions,
                    origError: config.gql.debug
                      ? error.extensions.origError
                      : null,
                  },
                };
              },
              ...config.gql,
            };
          },
          inject: [OrderManagementGqlConfig],
        }),
        OrderDataModule,
        ...asyncConfig.imports,
      ],
      providers: [
        createAsyncConfigProvider<OrderManagementGqlConfig>(
          OrderManagementGqlConfig,
          asyncConfig.useFactory,
          asyncConfig.inject
        ),
        ...QUERIES,
      ],
      exports: [OrderManagementGqlConfig],
    };
  }
}
