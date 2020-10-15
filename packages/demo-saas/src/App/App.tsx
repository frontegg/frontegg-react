import React, { FC } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { AuthExamples } from '../auth-examples';
import { ProtectedRoute, Profile, SSO, MFA, useAuthUser, Team } from '@frontegg/react-auth';
import { Profile as OldProfile } from '@frontegg/react';
import { PageTabProps, useT } from '@frontegg/react-core';
import { ComponentsPage } from '../ComponentsPage';
import { withFrontegg } from '../withFrontegg';
import { PopupExample } from '../PopupExample';
import { TableExample } from '../TableExample';
import { ComponentsPage2 } from '../ComponentsPage2';
import { GridExamples } from '../grid-examples';
import { SelectorExample } from '../SelectorExample';

const TestPage: FC = () => {
  const user = useAuthUser();
  return <div>{JSON.stringify(user)}</div>;
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
                <div>
                  <Link to='/profile'>Profile</Link>
                </div>
                <div>
                  <Link to='/sso'>SSO</Link>
                </div>
                <div>
                  <Link to='/test-auth-user'>Test Auth User</Link>
                </div>
                <div>
                  <Link to='/popup'>Popup Examples</Link>
                </div>
                <div>
                  <Link to='/table'>Table Examples</Link>
                </div>
                <div>
                  <Link to='/select'>Select Examples</Link>
                </div>
              </div>
            </Route>
            <Route path='/test-auth-user' component={TestPage} />
            <Route exact path='/components' component={ComponentsPage} />
            <Route exact path='/components2' component={ComponentsPage2} />
            <ProtectedRoute path='/test' />
            <ProtectedRoute path='/sso'>
              <SSO.Page />
            </ProtectedRoute>

            <ProtectedRoute path='/profile' component={Profile.Page} />
            <ProtectedRoute path='/team' component={Team.Page} />
            <Route exact path='/popup' component={PopupExample} />
            <Route exact path='/table' component={TableExample} />
            <Route exact path='/select' component={SelectorExample} />
            <Route exact path='/grids' component={GridExamples} />
          </Switch>
        </AuthExamples>
      </div>
    );
  }
}

export default withFrontegg(App);
