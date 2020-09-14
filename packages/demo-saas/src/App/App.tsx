import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withFrontegg } from '../withFrontegg';
import { AuthExamples } from '../auth-examples';
import { ProtectedRoute, Profile, SSO } from '@frontegg/react-auth';
import { Profile as OldProfile } from '@frontegg/react';

class App extends React.Component<any> {
  render() {
    return (
      <div className='app'>
        <AuthExamples>
          <Switch>
            <ProtectedRoute path='/sso' component={SSO.Page} />
            <ProtectedRoute path='/profile' component={Profile.Page} />
            <ProtectedRoute path='/profile2' component={OldProfile} />
          </Switch>
        </AuthExamples>
      </div>
    );
  }
}

export default withFrontegg(App);
