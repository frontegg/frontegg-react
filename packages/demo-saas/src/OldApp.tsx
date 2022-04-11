import React from 'react';
import { Switch, Route, Link, RouteProps } from 'react-router-dom';
import { AuditsExample } from 'auditsExample';
import {
  EmailComponent,
  ConnectivityPage,
  SlackComponent,
  SMSComponent,
  WebhookComponent,
} from '@frontegg/react-connectivity';

const menus: (RouteProps & { title: string })[] = [
  { path: '/connectivity', title: 'Connectivity', children: <ConnectivityPage rootPath='/connectivity' /> },
  { path: '/webhook', title: 'Webhook', component: WebhookComponent },
  { path: '/slack', title: 'Slack', component: SlackComponent },
  { path: '/emails', title: 'Email', component: EmailComponent },
  { path: '/sms', title: 'SMS', component: SMSComponent },
  { path: '/audits', title: 'Audits Example', component: AuditsExample },
];

class OldApp extends React.Component<any> {
  render() {
    return (
      <div className='app'>
        <Switch>
          <Route exact path='/'>
            <div>
              {menus.map(
                ({ path, title }, idx) =>
                  title && (
                    <div key={idx}>
                      <Link to={path as string}>{title}</Link>{' '}
                    </div>
                  )
              )}
            </div>
          </Route>
          {menus.map(({ path, component, children, exact }, idx) => (
            <Route key={idx} path={path} component={component} exact={exact}>
              {children}
            </Route>
          ))}
        </Switch>
      </div>
    );
  }
}

export default OldApp;
