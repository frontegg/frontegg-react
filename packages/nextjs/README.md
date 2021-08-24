# Frontegg Next.js

![alt text](https://fronteggstuff.blob.core.windows.net/frongegg-logos/logo-transparent.png)

Frontegg is a web platform where SaaS companies can set up their fully managed, scalable and brand aware - SaaS features
and integrate them into their SaaS portals in up to 5 lines of code.

### @frontegg/nextjs uses AdminPortal and LoginBox.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install frontegg Next.js library.

```bash
npm install @frontegg/nextjs
```

## Configuration

Wrap your application in `_app.js` with `Frontegg Provider`:

```js
import { FronteggProvider } from '@frontegg/nextjs'

const contextOptions = {
  baseUrl: 'https://{HOST}.frontegg.com',// Your backend base URL (frontegg will direct the requests to it)
}

export const App = ({ Component, pageProps }) => {
  return <FronteggProvider contextOptions={contextOptions}>
    <Component {...pageProps}/>
  </FronteggProvider>
}

```

### Usage

You can use React Hooks to access Frontegg store.

```js
import { useAuthUser } from '@frontegg/nextjs'

const HomePage = () => {
  const user = useAuthUser();

  return <div>
    Logged In user: {user.email}
  </div>
}
```

Openning the Admin Portal is available via the following code snippet.

```js
import { AdminPortal } from '@frontegg/nextjs'

const Toolbar = () => {

  return <nav>
    {/*... your application tabs ...*/}

    <button onClick={() => AdminPortal.show()}>
      Open Admin Portal
    </button>
  </nav>
}
```
