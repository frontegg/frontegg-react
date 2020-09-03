import React from 'react';
import { Component3 } from '../Component3';
import { withFrontegg } from '../withFrontegg';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '@frontegg/react-auth';
import { SsoConfiguration, Team } from '@frontegg/react';

class App extends React.Component<any> {
  render() {
    return <div className='app'>
      <Switch>
        <ProtectedRoute path='/sso' render={() => <SsoConfiguration rootDir={'/sso'}/>}/>
        <ProtectedRoute path='/team_management' render={() => <Team/>}/>
        <Route path='*' component={Component3}/>
      </Switch>
    </div>;
  }
}

export default withFrontegg(App);
