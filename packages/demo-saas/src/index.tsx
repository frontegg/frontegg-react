import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './App';
// import OldApp from './OldApp';
import {
  withFrontegg,
  // withOldFrontegg
} from './withFrontegg';
import { BrowserRouter } from 'react-router-dom';

const AppWithFrontegg = withFrontegg(App);
// const AuditLogsConnectivityApp = withOldFrontegg(OldApp);

ReactDOM.render(
  <BrowserRouter>
    <AppWithFrontegg />
    {/*<AuditLogsConnectivityApp />*/}
  </BrowserRouter>,
  document.getElementById('root')
);
