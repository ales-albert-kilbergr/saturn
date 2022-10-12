import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          scrollbarColor: `${theme.palette.primary.light}`,
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: `transparent`,
            width: 12,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 0,
            backgroundColor: '#cbcbcb',
          },
        },
      }),
    },
  },
});
