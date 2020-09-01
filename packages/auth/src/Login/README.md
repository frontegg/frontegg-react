#Login Component

Login components provide end-to-end integration with Authentication Service.

Each Auth Component export two types of component.
1. Full page (includes styles, headers, etc.) 
1. Standalone Component (Display components as used in the UI) 

## Usage
```jsx
import {LoginPage} from '@frontegg/react-auth'

export class MyRouter extends React.Component {
  render() {
    return <Switch>
      <Route path='/login' component={LoginPage}/>
    </Switch>  
  }
};
```
