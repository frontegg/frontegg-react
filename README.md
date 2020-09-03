
<p align="center">  
  <a href="https://www.frontegg.com/" rel="noopener" target="_blank">  
    <img style="margin-top:40px" height="50" src="https://frontegg.com/wp-content/uploads/2020/04/logo_frrontegg.svg" alt="Frontegg logo">  
  </a>  
</p>  
<h1 align="center">Frontegg-React</h1>  
<div align="center">  
  
[React](https://reactjs.org/) pre-built Component for faster and simpler integration with Frontegg services.  
</div>  

## Installation  
Frontegg-React is available as an [npm package](https://www.npmjs.com/package/@frontegg/react-core).  

<font color='red'>**NOTE!**:</font> **For typescript project make sure your are using typescirpt with version > 3.9.0**

```sh  
// using npm

/* with semantic UI (currently we only support semantic ui library) /*
yarn add @frontegg/react-core @frontegg/react-elements-semantic
  

// using npm

/* with semantic UI (currently we only support semantic ui library) /*
npm install @frontegg/react-core @frontegg/react-elements-semantic  
```

## Usage  
  
First of all you need to wrap your root app component with ``FronteggProvider``: 
  
```jsx  
import React from 'react';import ReactDOM from 'react-dom';  
import App from './App';  
import { FronteggProvider } from '@frontegg/react-core';  
import { uiLibrary } from '@frontegg/react-elements-semantic';  
import { createBrowserHistory } from 'history';  
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
<BrowserRouter>
  <FronteggProvider
        uiLibrary={uiLibrary}
        context={/* context options */}
        plugins={/* plugins to be used */}>
    <App />
  </FronteggProvider>
</BrowserRouter>, document.querySelector('#app'));  
```
``context`` property is used:

- Communication Settings
- Theme customization
- Component Configurations


## Plugins
**Frontegg-React** provide components per plugins for faster and simpler integration

- [Authentication Plugin](packages/auth)
- [Audits Plugin](packages/audits)
- [Team Management Plugin](packages/teams)
- [Notifications Plugin](packages/notifications)
- [Reports Plugin](packages/reports)
- [Integrations Plugin](packages/integrations)


## Contributing

The main purpose of this repository is to continue developing Frontegg React to making it faster and easier to use.
Read our [contributing guide](/CONTRIBUTING.md) to learn about our development process.

**Notice** that contributions go far beyond pull requests and commits.

## License

This project is licensed under the terms of the [MIT license](/LICENSE).
