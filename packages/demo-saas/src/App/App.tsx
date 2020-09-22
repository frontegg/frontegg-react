import React, { FC } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { withFrontegg } from '../withFrontegg';
import { AuthExamples } from '../auth-examples';
import { ProtectedRoute, Profile, SSO, MFA, useAuthUser } from '@frontegg/react-auth';
import { Profile as OldProfile } from '@frontegg/react';
import { PageTabProps, useT } from '@frontegg/react-core';

const TestPage: FC = () => {
  const user = useAuthUser();
  return <div>{user.roles[1].length}</div>;
};

const MyTab: FC & PageTabProps = () => {
  return <div>My Tab</div>;
};
MyTab.Title = (() => {
  const { t } = useT();
  return <>{t('common.enabled')}</>;
}) as FC;
MyTab.route = '/my-tab';

class App extends React.Component<any> {
  render() {
    return (
      <div className='app'>
        <AuthExamples>
          <Switch>
            <Route exact path='/'>
              <div>
                <div><Link to='/profile'>Profile</Link></div>
                <div><Link to='/sso'>SSO</Link></div>
                <div><Link to='/test-auth-user'>Test Auth User</Link></div>
              </div>
            </Route>
            <Route path='/test-auth-user' component={TestPage} />
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
