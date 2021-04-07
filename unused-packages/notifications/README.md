
<p align="center">  
  <a href="https://www.frontegg.com/" rel="noopener" target="_blank">  
    <img style="margin-top:40px" height="50" src="https://frontegg.com/wp-content/uploads/2020/04/logo_frrontegg.svg" alt="Frontegg logo">  
  </a>  
</p>  
<h1 align="center">Notifications Plugin</h1>  
<div align="center">  

Pre-built Components to easily integrate Notifications Components into your [React](https://reactjs.org/) App.  
</div>  
  
## Installation  
Frontegg-React-Notifications is available as an [npm package](https://www.npmjs.com/package/@frontegg/react-notifications).  
  
```sh  
// using npm  
npm install @frontegg/react-notifications  
  
// using yarn  
yarn add @frontegg/react-notifications  
  
// NOTE: to get the latest stable use @latest.  
```   
## Usage  
  
All you need is to add pass NotificationsPlugin to the ``FronteggProvider``: 
  

```jsx  
/* imports */
import { FronteggProvider } from '@frontegg/react-core';
import { NotificationsPlugin } from '@frontegg/react-notifications';

ReactDOM.render(
<BrowserRouter>
  <FronteggProvider
      context={/* context options */}
      plugins={[
        NotificationsPlugin()
      ]}>
    <App />
  </FronteggProvider>
</BrowserRouter>, document.querySelector('#app'));  
```


## Contributing

The main purpose of this repository is to continue developing Frontegg React to making it faster and easier to use.
Read our [contributing guide](/CONTRIBUTING.md) to learn about our development process.

**Notice** that contributions go far beyond pull requests and commits.

## License

This project is licensed under the terms of the [MIT license](/LICENSE).
