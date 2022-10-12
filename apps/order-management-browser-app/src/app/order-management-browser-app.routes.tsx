import path from 'path/win32';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { OrderListView, OrderManagementMainView } from './views';

export const orderManagementBrowserAppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <OrderManagementMainView />,
    children: [
      {
        path: '/',
        element: <Navigate to="list" replace />,
      },
      {
        path: 'list',
        element: <OrderListView />,
      },
    ],
  },
]);
