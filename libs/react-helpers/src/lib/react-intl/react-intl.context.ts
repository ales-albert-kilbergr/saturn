import * as React from 'react';
import { IReactIntlController } from './react-intl.controller';

export const ReactIntlControllerContext =
  React.createContext<IReactIntlController | null>(null);
