import React from 'react';
import ReactDOM from 'react-dom';
import WindowFrame from '@src/window/components/WindowFrame';
import App from './components/App';
import { ErrorBoundary } from '@components/ErrorBoundary';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './Theme';

console.log('[CP] : Renderer execution started');

const app = (
  <ThemeProvider theme={theme}>
    <ErrorBoundary>
      <WindowFrame title='ControlPad' platform='windows'>
        <App />
      </WindowFrame>
    </ErrorBoundary>
  </ThemeProvider>
);

ReactDOM.render(app, document.getElementById('app'));

if (process.env.NODE_ENV == 'development' && module.hot) module.hot.accept();
