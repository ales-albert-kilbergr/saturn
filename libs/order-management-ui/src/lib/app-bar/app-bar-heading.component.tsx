import * as React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const AppBarHeading = styled(Typography)(() => ({
  mr: 2,
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',
  flexGrow: 1,
})) as typeof Typography & React.FC;

AppBarHeading.defaultProps = {
  noWrap: true,
  component: 'a',
  href: '/',
};
