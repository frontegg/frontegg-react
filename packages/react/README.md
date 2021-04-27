# Frontegg React

![alt text](https://fronteggstuff.blob.core.windows.net/frongegg-logos/logo-transparent.png)

Frontegg is a web platform where SaaS companies can set up their fully managed, scalable and brand aware - SaaS features
and integrate them into their SaaS portals in up to 5 lines of code.

## BREAKING CHANGES SINCE VERSION 2.1.0

### The new Frontegg React uses AdminPortal and LoginBox instead of multiple components.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install frontegg React.JS library.

```bash
npm install @frontegg/react
```

## Configuration

Wrap your application with Frontegg Provider:

```js
import { FronteggProvider } from '@frontegg/react'

const contextOptions = {
  baseUrl: 'https://{HOST}.frontegg.com',                             // You backend base URL (frontegg will direct the requests to it)
}

export const App = () => {
  return <FronteggProvider contextOptions={contextOptions}>
    {/*...*/}
  </FronteggProvider>
}

```

### Usage

You can use React Hooks to access Frontegg store.

```js
import { useAuthUser } from '@frontegg/react'

const HomePage = () => {
  const user = useAuthUser();

  return <div>
    Logged In user: {user.email}
  </div>
}
```

You can use React Hooks to access Frontegg store.

```js
import { AdminPortal } from '@frontegg/react'

const Toolbar = () => {

  return <nav>
    {/*... your application tabs ...*/}

    <button onClick={() => AdminPortal.show()}>
      Open Admin Portal
    </button>
  </nav>
}
```
