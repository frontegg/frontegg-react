import React from 'react';
import { SSOComponent } from '../SSOComponent';
import { Component2 } from '../Component2';
import { Component3 } from '../Component3';
import { withFrontegg } from '../withFrontegg';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component<any> {
  render() {
    return <div className='app'>
      <Switch>
        <Route path='/sso' component={SSOComponent}/>
        <Route path='/c2' component={Component2}/>
        <Route path='*' component={Component3}/>
      </Switch>
    </div>;
  }
}

export default withFrontegg(App);
