
<p align="center">  
  <a href="https://www.frontegg.com/" rel="noopener" target="_blank">  
    <img style="margin-top:40px" height="50" src="https://frontegg.com/wp-content/uploads/2020/04/logo_frrontegg.svg" alt="Frontegg logo">  
  </a>  
</p>  
<h1 align="center">Authentication Plugin</h1>  
<div align="center">  

Pre-built Authentication components to easily integrate Auth Components into your [React](https://reactjs.org/) App.  
</div>  
  
## Installation  
Frontegg-React-Auth is available as an [npm package](https://www.npmjs.com/package/@frontegg/react-core).  
  
```sh  
// using npm  
npm install @frontegg/react-auth  
  
// using yarn  
yarn add @frontegg/react-auth  
  
// NOTE: to get the latest stable use @latest.  
```   
## Usage  
  
All you need is to add pass AuthPlugin to the ``FronteggProvider``: 
  

```jsx  
/* imports */
import { FronteggProvider } from '@frontegg/react-core';
import { AuthPlugin } from '@frontegg/react-auth';

ReactDOM.render(
<BrowserRouter>
  <FronteggProvider
      context={/* context options */}
      plugins={[
        AuthPlugin()
      ]}>
    <App />
  </FronteggProvider>
</BrowserRouter>, document.querySelector('#app'));  
```

## Options and Customizations
**Frontegg-React-Auth** provide the ability for fully customization components 
to align it with your App UI design.

### `header <React.ReactNode> (optional)`

React Component used to customize your authentication page header
```jsx
const plugins = [
  AuthPlugin({
    header: <MyAuthPageHeader/>,
    //...rest options
  })
];
```

### `backgroundColor <string> (optional)`

CSS Color used to for authentication page background color
```jsx
const plugins = [
  AuthPlugin({
    backgroundColor: '#FAFAFA' | 'red' | 'rgb(200,200,200)',  
    //...rest options
  })
];
```

### `loaderComponent <React.ReactNode> (optional)`

React Component displayed in first load while resolving the verifying the authenticated user, refreshing the token, 
and to check if the user should be redirected to login page. 
```jsx
const plugins = [
  AuthPlugin({
    loaderComponent: <MyLoaderComponent>,  
    //...rest options
  })
];
```

## Contributing

The main purpose of this repository is to continue developing Frontegg React to making it faster and easier to use.
Read our [contributing guide](/CONTRIBUTING.md) to learn about our development process.

**Notice** that contributions go far beyond pull requests and commits.

## License

This project is licensed under the terms of the [MIT license](/LICENSE).
