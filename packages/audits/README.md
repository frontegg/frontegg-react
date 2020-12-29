
<p align="center">
  <a href="https://www.frontegg.com/" rel="noopener" target="_blank">
    <img style="margin-top:40px" height="50" src="https://frontegg.com/wp-content/uploads/2020/04/logo_frrontegg.svg" alt="Frontegg logo">
  </a>
</p>
<h1 align="center">Audits Plugin</h1>
<div align="center">

Pre-built Table to easily integrate Audit logs into your [React](https://reactjs.org/) App.
</div>

## Installation

Frontegg-React-Audits is available as an [npm package](https://www.npmjs.com/package/@frontegg/react-audits).

```sh
// using npm
npm install @frontegg/react-audits

// using yarn
yarn add @frontegg/react-audits

// NOTE: to get the latest stable use @latest.
```

## Usage

All you need is to pass AuditsPlugin to the ``FronteggProvider``:

```jsx
/* imports */
import { FronteggProvider } from '@frontegg/react-core';
import { AuditsPlugin } from '@frontegg/react-audits';

ReactDOM.render(
<BrowserRouter>
  <FronteggProvider
      context={/* context options */}
      plugins={[
        AuditsPlugin()
      ]}>
    <App />
  </FronteggProvider>
</BrowserRouter>, document.querySelector('#app'));
```

  Then add `Audits` component to your route:

  ```jsx
  import { Audits } from '@frontegg/react-audits';

  <Route path={'/audits'} component={Audits.Page}/>
  ```

## Contributing

The main purpose of this repository is to continue developing Frontegg React to making it faster and easier to use.
Read our [contributing guide](/CONTRIBUTING.md) to learn about our development process.

**Notice** that contributions go far beyond pull requests and commits.

## License

This project is licensed under the terms of the [MIT license](/LICENSE).
