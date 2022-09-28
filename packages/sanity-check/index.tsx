import React from 'react';
import ReactDOM from 'react-dom/client';
import { FronteggProvider } from '@frontegg/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const contextOptions = {
    baseUrl: 'https://app-1p3iny7ql1ng.frontegg.com',
    clientId: 'f7094875-fa3b-48ab-b76f-3598095d2780'
}

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}>
          <App />
          </FronteggProvider>
      </BrowserRouter>
    </React.StrictMode>
);
