<br />
<div align="center">
<img src="https://fronteggstuff.blob.core.windows.net/frongegg-logos/logo-transparent.png" alt="Frontegg Logo" width="400" height="90">

<h3 align="center">Frontegg React.js</h3>

  <p align="center">
    Frontegg is a web platform where SaaS companies can set up their fully managed, scalable and brand aware - SaaS features and integrate them into their SaaS portals in up to 5 lines of code.
    <br />
</div>

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install frontegg React.JS library.

```bash
npm install @frontegg/react react-router-dom
```

## Configuration

Wrap your root component with `Frontegg Provider`:

```js
import React from 'react';
import ReactDOM from 'react-dom'; // For react 17
// For react 18: import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { FronteggProvider } from '@frontegg/react';

const contextOptions = {
  baseUrl: 'https://[YOUR_SUBDOMAIN].frontegg.com',
  clientId: '[YOUR-CLIENT-ID]'
};

// For react 18: 
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
ReactDOM.render(
    <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}>
        <App />
    </FronteggProvider>,
    document.getElementById('root')
);
```
In order to get your subDomain and clientId, visit our portal.

### Redirect to login

Using the Frontegg useAuth hook, you can determine whether a user is authenticated or not.
If the user is not authenticated, you can redirect the user to login via the useLoginWithRedirect hook as shown below.

```js
import './App.css';
// import { useEffect } from 'react';
import { ContextHolder } from '@frontegg/rest-api';
import { useAuth, useLoginWithRedirect } from '@frontegg/react';

function App() {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();

  // Uncomment this to redirect to login automatically
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     loginWithRedirect();
  //   }
  // }, [isAuthenticated, loginWithRedirect]);

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  return (
    <div className='App'>
      {isAuthenticated ? (
        <div>
          <div>
            <img src={user?.profilePictureUrl} alt={user?.name} />
          </div>
          <div>
            <span>Logged in as: {user?.name}</span>
          </div>
          <div>
            <button onClick={() => alert(user.accessToken)}>What is my access token?</button>
          </div>
          <div>
            <button onClick={() => logout()}>Click to logout</button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => loginWithRedirect()}>Click me to login</button>
        </div>
      )}
    </div>
  );
}

export default App;
```

## Integrate Admin Portal

Opening the Admin Portal is available via the following code snippet.

```js
import { AdminPortal } from '@frontegg/react'

const handleClick = () => {
  AdminPortal.show();
};

<button onClick={handleClick}>Settings</button>
```
