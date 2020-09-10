import React from 'react';
import { Component3 } from '../Component3';
import { Route, Switch } from 'react-router-dom';
import { LoginPage, ProtectedRoute, SSOPage, useAuth } from '@frontegg/react-auth';
import { withFrontegg } from '../withFrontegg';
import { useSelector } from 'react-redux';
import { AuthExamples } from '../auth-examples';
import { TestLogin } from './TestLogin';

const MySSOPage = () => {
  const state = useSelector((state) => state);
  const fronteggState = useAuth((state) => state);
  return (
    <div>
      <Route path={'/s3/ttt'} component={SSOPage} />
    </div>
  );
};

class App extends React.Component<any> {
  render() {
    return (
      <div className='app'>
        <AuthExamples>
          <Switch>
            <ProtectedRoute path='/s1' component={SSOPage} />

            <ProtectedRoute
              path='/s2'
              render={() => {
                return <SSOPage />;
              }}
            />
            <ProtectedRoute
              path='/s3'
              render={() => {
                return <MySSOPage />;
              }}
            />

            <Route path='*' component={Component3} />
          </Switch>
        </AuthExamples>
      </div>
    );
  }
}

export default withFrontegg(App);
