import { isValidLocale, ReactIntlLocale } from './react-intl.locales';

/**
 * Describes current locale cache. The cache is supposed to be asynchronous to
 * enable implementations fetching requests from server if needed.
 */
export interface IReactIntlLocaleCache {
  /**
   * Stores a new current locale into cache.
   */
  set: (locale: ReactIntlLocale) => Promise<void>;
  /**
   * Fetches current locale from cache.
   */
  get: () => Promise<ReactIntlLocale | undefined>;
}

export type IReactIntlLocaleCacheOption =
  | 'sessionStorage'
  | 'localStorage'
  | IReactIntlLocaleCache;
/**
 * Default current locale storage implementation supporting locale or session
 * storage.
 */
export class ReactIntlLocaleStorage implements IReactIntlLocaleCache {
  private constructor(
    private storage: Storage,
    private cacheKey: string = 'ReactIntlLocaleCache'
  ) {}

  public get() {
    const storedLocale = this.storage.getItem(this.cacheKey);
    return Promise.resolve(
      isValidLocale(storedLocale) ? storedLocale : undefined
    );
  }

  public set(locale: ReactIntlLocale | undefined) {
    this.storage.setItem(this.cacheKey, locale || '');
    return Promise.resolve();
  }

  public static fromLocalStorage() {
    return new ReactIntlLocaleStorage(localStorage);
  }

  public static fromSessionStorage() {
    return new ReactIntlLocaleStorage(sessionStorage);
  }

  public static fromOption(localeCache?: IReactIntlLocaleCacheOption) {
    if (localeCache === 'localStorage') {
      return ReactIntlLocaleStorage.fromLocalStorage();
    } else if (localeCache === 'sessionStorage') {
      return ReactIntlLocaleStorage.fromSessionStorage();
    } else if (typeof localeCache === 'object' && localeCache !== null) {
      return localeCache;
    } else {
      return null;
    }
  }
}
