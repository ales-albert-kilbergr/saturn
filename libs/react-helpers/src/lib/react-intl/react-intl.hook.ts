import * as React from 'react';
import { ResolvedIntlConfig } from 'react-intl';
import {
  IReactIntlLocaleCacheOption,
  ReactIntlLocaleStorage,
} from './react-intl.cache';
import { IReactIntlController } from './react-intl.controller';
import { ReactIntlProviderError } from './react-intl.error';
import { getLocaleFromClickEvent } from './react-intl.helpers';
import { enabledLocaleToArray, ReactIntlLocale } from './react-intl.locales';
import {
  IReactIntlReducer,
  reactIntlReducer,
  ReactIntlStateAction,
} from './react-intl.reducer';

export interface IReactIntlControllerHookProps {
  /**
   * The `defaultLocale` set initial locale to be choosed on application start.
   * If not provided, "en-US" will be choosen. The `defaultLocale` is applied
   * only if there had been no locale stored in cache.
   */
  defaultLocale?: ReactIntlLocale;
  /**
   * The `localeCache` alloes to set a cache for current locale. There are two
   * prepared options: "localeStorage" and "sessionStorage", but custom
   * implementation can be provided. By default cache is not applied.
   */
  localeCache?: IReactIntlLocaleCacheOption;
  /**
   * The `reducer` allows to implement its own state management function for
   * the hook.
   */
  reducer?: IReactIntlReducer;

  loadLocaleData: (
    locale: ReactIntlLocale
  ) => Promise<ResolvedIntlConfig['messages']>;
}

export type IReactIntlControllerHook = (
  props: IReactIntlControllerHookProps
) => IReactIntlController;

const defaultProps: Partial<IReactIntlControllerHookProps> &
  Required<Pick<IReactIntlControllerHookProps, 'defaultLocale' | 'reducer'>> = {
  defaultLocale: ReactIntlLocale.EN_US,
  reducer: reactIntlReducer,
};

export const useReactIntlControllerProvider: IReactIntlControllerHook = (
  props
) => {
  // 1) Merges props with default props
  const normalizedProps = React.useMemo(
    () => Object.assign(defaultProps, props),
    [props]
  );
  // 2) Initialize the hook state.
  const [state, dispatch] = React.useReducer<IReactIntlReducer>(
    normalizedProps.reducer,
    {
      currentLocale: undefined,
      intlMessages: null,
    }
  );
  // 3) Resolve current locale cache option to an implementation if required.
  const cache = React.useMemo(
    () => ReactIntlLocaleStorage.fromOption(normalizedProps.localeCache),
    [normalizedProps.localeCache]
  );
  // Define setLocale callback to expose current locale state manipulation.
  const setLocale = React.useCallback(
    async (locale: ReactIntlLocale) => {
      const intlMessages = await props.loadLocaleData(locale);
      dispatch({
        type: ReactIntlStateAction.SET_INTL_MESSAGE,
        payload: intlMessages,
      });
      dispatch({
        type: ReactIntlStateAction.SET_CURRENT_LOCALE,
        payload: locale,
      });

      if (cache) {
        await cache.set(locale);
      }
    },
    [cache, dispatch]
  );
  // Runs on component init after first render or if the default locale changes.
  React.useEffect(() => {
    if (cache) {
      cache
        .get()
        .then((locale) => setLocale(locale || normalizedProps.defaultLocale))
        .catch((error) =>
          ReactIntlProviderError.FetchFromCacheFailed(cache, error)
        );
    } else {
      setLocale(normalizedProps.defaultLocale);
    }
    // We want to run this effect on application init or only if for some
    // unseen reason the `defaultLocale` would change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalizedProps.defaultLocale, cache]);
  // Exposes a callback to handle mouse event meant to change current locale.
  const handleSetLocaleClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const locale = getLocaleFromClickEvent(event);
      setLocale(locale);
    },
    [setLocale]
  );
  // Publish the hook controller.
  return React.useMemo<IReactIntlController>(
    () => ({
      setLocale,
      intlMessages: state.intlMessages,
      defaultLocale: normalizedProps.defaultLocale,
      enabledLocales: enabledLocaleToArray(),
      currentLocale: state.currentLocale,
      handleSetLocaleClick,
    }),
    [
      setLocale,
      state.intlMessages,
      state.currentLocale,
      normalizedProps.defaultLocale,
      handleSetLocaleClick,
    ]
  );
};
