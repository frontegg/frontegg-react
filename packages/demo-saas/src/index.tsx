import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { FronteggProvider } from '@frontegg/react';
import { App } from './App';

import './index.css';

const contextOptions = {
  // @ts-ignore
  baseUrl: process.env.FRONTEGG_BASE_URL || 'https://demo.frontegg.com',
  // @ts-ignore
  clientId: process.env.FRONTEGG_CLIENT_ID || 'b6adfe4c-d695-4c04-b95f-3ec9fd0c6cca',
};

ReactDOM.render(
  <BrowserRouter>
    <FronteggProvider contextOptions={contextOptions} hostedLoginBox={false}>
      <App />
    </FronteggProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
