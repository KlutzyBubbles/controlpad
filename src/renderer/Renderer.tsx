import React from 'react';
import ReactDOM from 'react-dom';
import WindowFrame from '@src/window/components/WindowFrame';
import App from './components/App';

console.log('[CP] : Renderer execution started');

const app = (
  <WindowFrame title='ControlPad' platform='windows'>
      <App />
  </WindowFrame>
);

ReactDOM.render(app, document.getElementById('app'));

if (process.env.NODE_ENV == 'development' && module.hot) module.hot.accept();
