import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { OrderManagementBrowserApp } from './app';
import { ReactIntlLocale } from '@oms/react-helpers';

function loadLocaleData(locale: ReactIntlLocale) {
  const normalizedLocale = locale.toLocaleLowerCase();

  return import(`./assets/compiled-intl/${normalizedLocale}.json`);
}

function main() {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache({
      typePolicies: {},
    }),
  });

  root.render(
    <StrictMode>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <OrderManagementBrowserApp
            defaultLocale={ReactIntlLocale.EN_US}
            loadLocaleData={loadLocaleData}
          />
        </BrowserRouter>
      </ApolloProvider>
    </StrictMode>
  );
}

main();
