import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './App';
import { withFrontegg } from './withFrontegg';
import { BrowserRouter } from 'react-router-dom';

const AppWithFrontegg = withFrontegg(App);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWithFrontegg />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
