
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
  
```sh  
// using npm  
npm install @frontegg/react-core  
  
// using yarn  
yarn add @frontegg/react-core  
  
// NOTE: to get the latest stable use @latest.  
```   
## Usage  
  
First of all you need to wrap your root app component with ``FronteggProvider``: 
  
```jsx  
import React from 'react';import ReactDOM from 'react-dom';  
import App from './App';  
import {FronteggProvider} from '@frontegg/react-core';  
import {createBrowserHistory} from 'history';  
import { BrowserRouter } from 'react-router';  

ReactDOM.render(
<BrowserRouter>
	<FronteggProvider
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
