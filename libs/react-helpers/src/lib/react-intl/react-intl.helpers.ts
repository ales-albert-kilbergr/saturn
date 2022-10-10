import { ReactIntlProviderError } from './react-intl.error';
import { isValidLocale, ReactIntlLocale } from './react-intl.locales';

export function getLocaleFromClickEvent(
  event: React.MouseEvent<HTMLElement>
): ReactIntlLocale {
  const locale: string | undefined = event.currentTarget.dataset['locale'];

  if (!locale) {
    throw ReactIntlProviderError.MissingLocaleData();
  }

  if (!isValidLocale(locale)) {
    throw ReactIntlProviderError.InvalidLocale(locale);
  }

  return locale;
}
