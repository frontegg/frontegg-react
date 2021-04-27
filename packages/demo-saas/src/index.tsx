import React from 'react';
import ReactDOM from 'react-dom';
// import './index.scss';
// import { App } from './App';
// import { withFrontegg } from './withFrontegg';
import { FronteggProvider, useAuthUserOrNull, AdminPortal } from '@frontegg/react';

// const AppWithFrontegg = withFrontegg(App);

const DD = () => {
  const user = useAuthUserOrNull();
  return (
    <div>
      User: {user?.email ?? 'Not Logged In'}
      <br />
      <button onClick={() => AdminPortal.show()}>Open Admin Portal</button>
    </div>
  );
};
ReactDOM.render(
  // <React.StrictMode>
  // <BrowserRouter>
  //   <AppWithFrontegg />

  <FronteggProvider contextOptions={{ baseUrl: 'https://david.frontegg.com' }}>
    <DD />
  </FronteggProvider>,
  // </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('root')
);
