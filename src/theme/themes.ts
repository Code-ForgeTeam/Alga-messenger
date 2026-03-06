import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#8774E1', light: '#A89BEC', dark: '#6C5CE7' },
    background: { default: '#0E1621', paper: '#17212B' },
    text: { primary: '#F5F5F5', secondary: '#708499' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: 10 } } },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#7D6AE3', light: '#A69AF1', dark: '#6754D0' },
    secondary: { main: '#7D6AE3' },
    background: { default: '#ECECEC', paper: '#FFFFFF' },
    text: { primary: '#1F2530', secondary: '#6C7A88' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: 10 } } },
  },
});

export const createCustomTheme = (colors: {
  primary: string;
  secondary: string;
  background: string;
  paper: string;
}) =>
  createTheme({
    palette: {
      mode: 'dark',
      primary: { main: colors.primary },
      secondary: { main: colors.secondary },
      background: { default: colors.background, paper: colors.paper },
      text: { primary: '#ffffff', secondary: '#BDC3C7' },
    },
  });
