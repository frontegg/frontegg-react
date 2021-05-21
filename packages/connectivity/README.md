
<p align="center">
  <a href="https://www.frontegg.com/" rel="noopener" target="_blank">
    <img style="margin-top:40px" height="50" src="https://frontegg.com/wp-content/uploads/2020/04/logo_frrontegg.svg" alt="Frontegg logo">
  </a>
</p>
<h1 align="center">Connectivity Plugin</h1>
<div align="center">

Pre-built Table to easily integrate Connectivity Services into your [React](https://reactjs.org/) App.
</div>

## Installation

Frontegg-React-Connectivity is available as an [npm package](https://www.npmjs.com/package/@frontegg/react-connectivity).

```sh
// using npm
npm install @frontegg/react-connectivity

// using yarn
yarn add @frontegg/react-connectivity

// NOTE: to get the latest stable use @latest.
```

## Usage

All you need is to pass AuditsPlugin to the ``FronteggProvider``:

```jsx
/* imports */
import { FronteggProvider } from '@frontegg/react-core';
import { ConnectivityPlugin } from '@frontegg/react-connectivity';

const plugins = [ConnectivityPlugin()];

ReactDOM.render(
<BrowserRouter>
  <FronteggProvider
      context={/* context options */}
      plugins={plugins}>
    <App />
  </FronteggProvider>
</BrowserRouter>, document.querySelector('#app'));
```

Then add `ConnectivityPage` component to your route:

  ```jsx
  import { ConnectivityPage } from '@frontegg/react-connectivity';

  <Route exact={false} path={'/connectivity'} component={ConnectivityPage}/>

  // or if you want to add special parameters for the ConnectivityPage component

  <Router exact={false} path={'/somewhere/connectivity''}>
    <ConnectivityPage rootPath='/somewhere/connectivity' />
  </Router>

  ```

## Parameters
  - rootPath - a custom root path for the component by default it's `/connectivity`
  - className - a className for the whole container
  - headClassName - a className for the header component
  - contentClassName - a className for the container of the table
  - fitContent - the parameter makes a scrollable container for the table data

## Contributing

The main purpose of this repository is to continue developing Frontegg React to making it faster and easier to use.
Read our [contributing guide](/CONTRIBUTING.md) to learn about our development process.

**Notice** that contributions go far beyond pull requests and commits.

## License

This project is licensed under the terms of the [MIT license](/LICENSE).
