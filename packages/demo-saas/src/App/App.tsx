import React, { FC } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { ProtectedRoute, Profile, SSO, useAuthUser, Team } from '@frontegg/react-auth';
import { ElementsPage } from '../Elements/ElementsPage';
import { PopupExample } from '../PopupExample';
import { TableExample } from '../TableExample';
import { ComponentsPage2 } from '../ComponentsPage2';
import { GridExamples } from '../grid-examples';
import { SelectorExample } from '../SelectorExample';
import { NotificationsExample } from '../notifications-example';
import { DialogExample } from '../DialogExample';
import {
  EmailComponent,
  IntegrationsPage,
  SlackComponent,
  SMSComponent,
  WebhookComponent,
} from '@frontegg/react-integrations';
import { Icons } from 'pages/Icons';

const TestPage: FC = () => {
  const user = useAuthUser();
  return <div>{JSON.stringify(user)}</div>;
};

const menus = [
  { to: '/profile', title: 'Profile', component: Profile.Page },
  { to: '/team', title: 'Team', component: Team.Page },
  { to: '/sso', title: 'SSO', children: <SSO.Page /> },
  { to: '/test-auth-user', title: 'Test Auth User', component: TestPage },
  { to: '/popup', title: 'Popup Examples', component: PopupExample },
  { to: '/table', title: 'Table Examples', component: TableExample },
  { to: '/select', title: 'Select Examples', component: SelectorExample },
  { to: '/connectivity', title: 'Integrations', children: <IntegrationsPage rootPath='/connectivity' /> },
  { to: '/webhook', title: 'Webhook', component: WebhookComponent },
  { to: '/slack', title: 'Slack', component: SlackComponent },
  { to: '/emails', title: 'Email', component: EmailComponent },
  { to: '/sms', title: 'SMS', component: SMSComponent },
  { to: '/notifications', title: 'Notifications Example', children: <NotificationsExample /> },
  { to: '/components2', component: ComponentsPage2, exact: true },
  { to: '/components', component: ElementsPage },
  { to: '/grids', component: GridExamples },
  { to: '/dialog', component: DialogExample },
  { to: '/icons', component: Icons },
];
class App extends React.Component<any> {
  render() {
    return (
      <div className='app'>
        <Switch>
          <Route exact path='/'>
            <div>
              {menus.map(
                ({ to, title }, idx) =>
                  title && (
                    <div key={idx}>
                      <Link to={to}>{title}</Link>{' '}
                    </div>
                  )
              )}
            </div>
          </Route>
          {menus.map(({ to, component, children, exact }, idx) => (
            <Route key={idx} path={to} component={component} exact={exact}>
              {children}
            </Route>
          ))}
          <ProtectedRoute path='/profile' component={Profile.Page} />
        </Switch>
      </div>
    );
  }
}

export default App;
