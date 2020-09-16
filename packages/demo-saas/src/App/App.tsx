import React from 'react';
import { Switch } from 'react-router-dom';
import { withFrontegg } from '../withFrontegg';
import { AuthExamples } from '../auth-examples';
import { ProtectedRoute, Profile, SSO, MFA } from '@frontegg/react-auth';
import { Profile as OldProfile } from '@frontegg/react';

class App extends React.Component<any> {
  render() {
    return (
      <div className='app'>
        <AuthExamples>
          <Switch>
            <ProtectedRoute path='/test' />
            <ProtectedRoute path='/sso'>
              <SSO.Page />
            </ProtectedRoute>
            <ProtectedRoute path='/profile' component={Profile.Page} />
            <ProtectedRoute path='/profile2' component={OldProfile} />
          </Switch>
        </AuthExamples>
      </div>
    );
  }
}

export default withFrontegg(App);
