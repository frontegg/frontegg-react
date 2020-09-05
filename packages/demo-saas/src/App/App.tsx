import React from 'react';
import { Component3 } from '../Component3';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute, SSOPage } from '@frontegg/react-auth';
import { withFrontegg } from '../withFrontegg';

// import { Team } from '@frontegg/react';

class App extends React.Component<any> {
  render() {

    return <div className='app'>
      <Switch>
        <ProtectedRoute path='/sso' render={() => <SSOPage rootPath='/sso'/>}/>
        {/*<ProtectedRoute path='/team_management' render={() => <Team/>}/>*/}
        <Route path='*' component={Component3}/>
      </Switch>
    </div>;
  }
}

export default withFrontegg(App);
