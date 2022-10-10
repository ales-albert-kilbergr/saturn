import { defineMessage } from 'react-intl';

export const REACT_INTL_MESSAGES = {
  'de-DE': defineMessage({
    description: 'German language title',
    defaultMessage: 'German',
  }),
  'en-US': defineMessage({
    description: 'English language title',
    defaultMessage: 'English (US)',
  }),
  'fr-FR': defineMessage({
    description: 'French language title',
    defaultMessage: 'French',
  }),
  selectLanguageTooltip: defineMessage({
    description: 'Select language helper tooltip',
    defaultMessage: 'Select a language',
  }),
};
