import * as React from 'react';
import {
  ReactIntlControllerProvider,
  ReactIntlLocale,
  IReactIntlControllerProviderProps,
  useReactIntlControllerProvider,
} from '@oms/react-helpers';

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
    <ReactIntlControllerProvider
      defaultLocale={props.defaultLocale}
      loadLocaleData={props.loadLocaleData}
    >
      <div>APP</div>
    </ReactIntlControllerProvider>
  );
};

OrderManagementBrowserApp.displayName = 'OrderManagementBrowserApp';

OrderManagementBrowserApp.defaultProps = {};
