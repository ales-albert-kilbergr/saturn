import * as React from 'react';
import { AppFrame, OrderAppBar } from '@oms/order-management-ui';
import { Outlet } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { ORDER_MANAGEMENT_INTL_MESSAGES } from '../order-management.messages';

export interface IOrderManagementMainViewProps {}

export type OrderManagementMainViewComponent =
  React.FC<IOrderManagementMainViewProps>;

export const OrderManagementMainView: OrderManagementMainViewComponent = (
  props
) => {
  return (
    <AppFrame
      headerSlot={
        <OrderAppBar
          heading={
            <FormattedMessage
              {...ORDER_MANAGEMENT_INTL_MESSAGES.orderManagementHeading}
            />
          }
        />
      }
      contentSlot={<Outlet />}
    />
  );
};

OrderManagementMainView.displayName = 'OrderManagementMainView';

OrderManagementMainView.defaultProps = {};
