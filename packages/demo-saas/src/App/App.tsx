import React from 'react';
import { Component3 } from '../Component3';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute, SSOPage, useAuth } from '@frontegg/react-auth';
import { withFrontegg } from '../withFrontegg';
import { useSelector } from 'react-redux';

const MySSOPage = () => {
  return <div>
    <Route path={'/s3/ttt'} component={SSOPage}/>
  </div>;
};

class App extends React.Component<any> {
  render() {

    return <div className='app'>
      <Switch>
        <ProtectedRoute path='/s1' component={SSOPage}/>
        <ProtectedRoute path='/s2' render={() => {

          return <SSOPage/>;
        }}/>
        <ProtectedRoute path='/s3' render={() => {

          return <MySSOPage/>;
        }}/>
        {/*<ProtectedRoute path='/team_management' render={() => <Team/>}/>*/}
        <Route path='*' component={Component3}/>
      </Switch>
    </div>;
  }
}

export default withFrontegg(App);
