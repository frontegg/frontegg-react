import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { FronteggProvider } from '@frontegg/react';
import { App } from './App';

ReactDOM.render(
  <BrowserRouter>
    <FronteggProvider
      contextOptions={{
        baseUrl: `https://david.frontegg.com`,
      }}
    >
      <App />
    </FronteggProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
