import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#8774E1' },
    background: { default: '#0E1621', paper: '#17212B' },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#8774E1' },
    background: { default: '#F0F0F0', paper: '#FFFFFF' },
  },
});
