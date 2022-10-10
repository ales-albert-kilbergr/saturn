import { IReactIntlLocaleCache } from './react-intl.cache';
import { enabledLocaleToArray } from './react-intl.locales';

/**
 * List of possible error codes which can occure when working with
 * ReactIntlHook and its controller. Those can be used when handlig
 * with error boundaries.
 */
export enum ReactIntlProviderErrorCode {
  MISSING_DATA_LOCALE = 'ERR_MISSING_DATA_LOCALE',
  INVALID_LOCALE = 'ERR_INVALID_LOCALE',
  FETCH_CACHE_FAILED = 'ERR_FETCH_CACHE_FAILED',
}

/**
 * Defines all well known errors which may occure inside of the hook. The
 * typed error can be easily cached and procesed in error boudary compoments.
 */
export class ReactIntlProviderError extends Error {
  constructor(
    public readonly code: ReactIntlProviderErrorCode,
    public readonly reason: string,
    public readonly origError?: Error
  ) {
    super(`[${ReactIntlProviderError.name}.${code}]: ${reason}`);
  }
  /**
   * There is no data-locale attribute on element, which initiated a click
   * event in order to set new current locale.
   */
  public static MissingLocaleData() {
    return new ReactIntlProviderError(
      ReactIntlProviderErrorCode.MISSING_DATA_LOCALE,
      `Html element must have populated attribute "data-locale"!`
    );
  }
  /**
   * The locale provided to set the current or default locale is not in the list
   * of enabled locales.
   */
  public static InvalidLocale(locale: string | undefined) {
    return new ReactIntlProviderError(
      ReactIntlProviderErrorCode.INVALID_LOCALE,
      `Invalid locale "${locale}" provided. ` +
        `Only "${enabledLocaleToArray().join(', ')}" are enabled!`
    );
  }
  /**
   * An attempt to fetch current locale from cache failed. This error may
   * occure specialy with custom current locale cache implementations.
   */
  public static FetchFromCacheFailed(
    cache: IReactIntlLocaleCache,
    origError: Error
  ) {
    return new ReactIntlProviderError(
      ReactIntlProviderErrorCode.FETCH_CACHE_FAILED,
      `Failed to load current locale from cache "${cache.constructor.name}"`,
      origError
    );
  }
}
