import { ResolvedIntlConfig } from 'react-intl';
import { ReactIntlLocale } from './react-intl.locales';

/**
 * Describes a controller, which the hook returns back to access and manipulate
 * its own state.
 */
export interface IReactIntlController {
  /**
   * The `intlMessages` represents currently used dictionary. The object
   * shoulds be treated as read-only
   */
  intlMessages: ResolvedIntlConfig['messages'] | null;
  /**
   * The `defaultLocale` expose what locale had been set as default.
   */
  defaultLocale: ReactIntlLocale;
  /**
   * The `enabledLocales` lists all available locales for application.
   */
  enabledLocales: ReactIntlLocale[];
  /**
   * The `currentLocale` is the currently applied locale
   */
  currentLocale?: ReactIntlLocale;
  /**
   * The `setLocale` allows to change a current locale in application, which
   * will result into rerender of all Formatted components and will load
   * a dictionary according to provided locale.
   */
  setLocale: (locale: ReactIntlLocale) => Promise<void>;
  /**
   * The `handleSetLocaleClick` is a helper method to be binded on an active
   * element, which is meant to change the locale by mouse click, like a button.
   *
   * There is one requirement, the element MUST hold an attribute `data-locale`
   * with a value which is supposed to be from ReactIntlLocale list.
   */
  handleSetLocaleClick: (event: React.MouseEvent<HTMLElement>) => void;
}
