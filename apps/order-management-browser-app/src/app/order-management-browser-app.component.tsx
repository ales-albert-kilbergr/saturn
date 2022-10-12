import * as React from 'react';
import {
  ReactIntlControllerProvider,
  ReactIntlLocale,
  IReactIntlControllerProviderProps,
  useReactIntlControllerProvider,
} from '@oms/react-helpers';
import { OrderManagementUiProvider } from '@oms/order-management-ui';
import { RouterProvider } from 'react-router';
import { orderManagementBrowserAppRoutes } from './order-management-browser-app.routes';

export interface IOrderManagementBrowserAppProps {
  defaultLocale: ReactIntlLocale;
  loadLocaleData: IReactIntlControllerProviderProps['loadLocaleData'];
}

export type OrderManagementBrowserAppComponent =
  React.FC<IOrderManagementBrowserAppProps>;

export const OrderManagementBrowserApp: OrderManagementBrowserAppComponent = (
  props
) => {
  return (
    <OrderManagementUiProvider>
      <ReactIntlControllerProvider
        defaultLocale={props.defaultLocale}
        loadLocaleData={props.loadLocaleData}
      >
        <RouterProvider router={orderManagementBrowserAppRoutes} />
      </ReactIntlControllerProvider>
    </OrderManagementUiProvider>
  );
};

OrderManagementBrowserApp.displayName = 'OrderManagementBrowserApp';

OrderManagementBrowserApp.defaultProps = {};
