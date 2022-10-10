import * as React from 'react';
import { IntlProvider, ResolvedIntlConfig } from 'react-intl';
import { IReactIntlLocaleCacheOption } from './react-intl.cache';
import { ReactIntlControllerContext } from './react-intl.context';
import { useReactIntlControllerProvider } from './react-intl.hook';
import { ReactIntlLocale } from './react-intl.locales';

export interface IReactIntlControllerProviderProps
  extends React.PropsWithChildren {
  defaultLocale?: ReactIntlLocale;
  localeCache?: IReactIntlLocaleCacheOption;

  loadLocaleData: (
    locale: ReactIntlLocale
  ) => Promise<ResolvedIntlConfig['messages']>;
}

export type ReactIntlControllerProviderComponent =
  React.FC<IReactIntlControllerProviderProps>;

export const ReactIntlControllerProvider: ReactIntlControllerProviderComponent =
  (props) => {
    const controller = useReactIntlControllerProvider({
      defaultLocale: props.defaultLocale,
      localeCache: props.localeCache,
      loadLocaleData: props.loadLocaleData,
    });

    if (!controller.intlMessages) {
      return null;
    }

    return (
      <IntlProvider
        messages={controller.intlMessages}
        locale={controller.defaultLocale}
      >
        <ReactIntlControllerContext.Provider value={controller}>
          {props.children}
        </ReactIntlControllerContext.Provider>
      </IntlProvider>
    );
  };

ReactIntlControllerProvider.displayName = 'ReactIntlControllerProvider';

ReactIntlControllerProvider.defaultProps = {
  defaultLocale: ReactIntlLocale.EN_US,
  localeCache: 'localStorage',
};
