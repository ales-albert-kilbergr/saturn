import { CssBaseline, ThemeProvider } from '@mui/material';
import * as React from 'react';
import { lightTheme } from './themes';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export interface IOrderManagementUiProviderProps
  extends React.PropsWithChildren {}

export type OrderManagementUiProviderComponent =
  React.FC<IOrderManagementUiProviderProps>;

export const OrderManagementUiProvider: OrderManagementUiProviderComponent = (
  props
) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};

OrderManagementUiProvider.displayName = 'OrderManagementUiProvider';

OrderManagementUiProvider.defaultProps = {};
