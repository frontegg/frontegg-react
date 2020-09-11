import React from 'react';
import { Component3 } from '../Component3';
import { Route, Switch } from 'react-router-dom';
import { withFrontegg } from '../withFrontegg';
import { useSelector } from 'react-redux';
import { AuthExamples } from '../auth-examples';
import { ProtectedRoute, useAuth, SSO } from '@frontegg/react-auth';

const MySSOPage = () => {
  const state = useSelector((state) => state);
  const fronteggState = useAuth((state) => state);
  return (
    <div>
      <Route path={'/s3/ttt'} component={SSO.Page} />
    </div>
  );
};

class App extends React.Component<any> {
  render() {
    return (
      <div className='app'>
        <AuthExamples>
          <Switch>
            <ProtectedRoute path='/s1'>
              <SSO.Page>
                <SSO.Header />
                <SSO.Router>
                  <SSO.OverviewPage>
                    <SSO.Toggle />
                    <SSO.Steps />
                    <SSO.NoDataPlaceholder />
                  </SSO.OverviewPage>
                  <SSO.ClaimDomainPage />
                  <SSO.ConfigureIDPPage />
                </SSO.Router>
              </SSO.Page>
            </ProtectedRoute>

            <ProtectedRoute path='/s2'>
              <SSO.Page />
            </ProtectedRoute>

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
