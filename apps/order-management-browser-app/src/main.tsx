import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from '@apollo/client';
import { OrderManagementBrowserApp } from './app';
import { ReactIntlLocale } from '@oms/react-helpers';
import {
  ORDER_COUNT_TYPE_POLICY,
  ORDER_LIST_TYPE_POLICY,
  ORDER_TYPE_POLICY,
} from '@oms/order-management-gql-client';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';

function loadLocaleData(locale: ReactIntlLocale) {
  const normalizedLocale = locale.toLocaleLowerCase();

  return import(`./assets/compiled-intl/${normalizedLocale}.json`);
}

function main() {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  const httpLink = new HttpLink({
    uri: 'http://localhost:4200/graphql',
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: 'ws://localhost:4200/graphql',
    })
  );

  // The split function takes three parameters:
  //
  // * A function that's called for each operation to execute
  // * The Link to use for an operation if the function returns a "truthy" value
  // * The Link to use for an operation if the function returns a "falsy" value
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    uri: '/graphql',
    link: splitLink,
    cache: new InMemoryCache({
      typePolicies: {
        Order: ORDER_TYPE_POLICY,
        OrderCount: ORDER_COUNT_TYPE_POLICY,
        OrderList: ORDER_LIST_TYPE_POLICY,
      },
    }),
  });

  root.render(
    <StrictMode>
      <ApolloProvider client={client}>
        <OrderManagementBrowserApp
          defaultLocale={ReactIntlLocale.EN_US}
          loadLocaleData={loadLocaleData}
        />
      </ApolloProvider>
    </StrictMode>
  );
}

main();
