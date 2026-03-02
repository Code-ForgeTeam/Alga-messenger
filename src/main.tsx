import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import { useSettingsStore } from './stores/settingsStore';
import { createCustomTheme, darkTheme, lightTheme } from './theme/themes';

function Root() {
  const { theme, customColors } = useSettingsStore();
  const muiTheme = theme === 'dark' ? darkTheme : theme === 'light' ? lightTheme : createCustomTheme(customColors);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
}

const viewport = window.visualViewport;
if (viewport) {
  const updateHeight = () => {
    document.documentElement.style.setProperty('--app-height', `${viewport.height}px`);
  };
  viewport.addEventListener('resize', updateHeight);
  viewport.addEventListener('scroll', updateHeight);
  updateHeight();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
