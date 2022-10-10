/**
 * Hardcoded list of enabled locales in the application.
 */
export enum ReactIntlLocale {
  DE_DE = 'de-DE',
  EN_US = 'en-US',
  FR_FR = 'fr-FR',
}

/**
 * Turns the enabled locale enum into array of values.
 */
export function enabledLocaleToArray(): ReactIntlLocale[] {
  return Reflect.ownKeys(ReactIntlLocale)
    .filter((key) => typeof key === 'string')
    .map((key) => Reflect.get(ReactIntlLocale, key));
}

/**
 * Provides a type guard to check if given value is type of ReactIntlLocale
 */
export function isValidLocale(
  locale: string | undefined | null
): locale is ReactIntlLocale {
  return enabledLocaleToArray().includes(locale as ReactIntlLocale);
}
