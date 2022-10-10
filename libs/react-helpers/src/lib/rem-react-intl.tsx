import * as React from 'react';
import { ResolvedIntlConfig } from '@formatjs/intl/src/types';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { US, FR, DE } from 'country-flag-icons/react/3x2';
import { FormattedMessage } from 'react-intl';
import { APP_INTL_MESSAGES } from './app.messages';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

/**
 * List of options to choose from, when customizing locale cache behavior.
 *
 * Local and Session storage are predefined, but own implementation with
 * including server fetching request can be injected instead.
 */

export type IRocketBrowserAppIntlHook = (
  props: IRocketBrowserAppIntlHookProps
) => IRocketBrowserAppIntlController;

export const RocketBrowserAppIntlContext =
  React.createContext<IRocketBrowserAppIntlController | null>(null);

export function useRocketBrowserAppIntl() {
  return React.useContext(RocketBrowserAppIntlContext);
}

export interface ILocaleFlagProps {
  locale?: RocketBrowserAppIntlLocale | null;
}

export const LocaleFlag: React.FC<ILocaleFlagProps> = (props) => {
  switch (props.locale) {
    case RocketBrowserAppIntlLocale.DE_DE:
      return <DE style={{ width: '24px' }} />;
    case RocketBrowserAppIntlLocale.EN_US:
      return <US style={{ width: '24px' }} />;
    case RocketBrowserAppIntlLocale.FR_FR:
      return <FR style={{ width: '24px' }} />;
    default:
      return null;
  }
};

/**
 * Locale select control for application toolbar.
 */
export const RocketBrowserAppLocaleSelect = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuToggle = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );
  const open = Boolean(anchorEl);
  const handleMenuClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);
  const appIntl = useRocketBrowserAppIntl();

  const handleLocaleSelect = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      appIntl?.handleSetLocaleClick(event);
      handleMenuClose();
    },
    // We want explicitly check the handleSetLocaleClick, we do not care about
    // the appInlt object, beacuase it can be recreated with a reference to the
    // same handleSetLocaleClick callback.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleMenuClose, appIntl?.handleSetLocaleClick]
  );

  return (
    <>
      <Tooltip
        title={
          <FormattedMessage {...APP_INTL_MESSAGES.selectLanguageTooltip} />
        }
      >
        <IconButton onClick={handleMenuToggle}>
          <LocaleFlag locale={appIntl?.currentLocale} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        // Position menu popover at the bottom of the app bar.
        anchorOrigin={{ horizontal: 'right', vertical: 48 }}
      >
        {appIntl?.enabledLocales.map((locale) => (
          <MenuItem
            key={locale}
            data-locale={locale}
            onClick={handleLocaleSelect}
          >
            <ListItemIcon>
              <LocaleFlag locale={locale} />
            </ListItemIcon>
            <FormattedMessage {...APP_INTL_MESSAGES[locale]} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
