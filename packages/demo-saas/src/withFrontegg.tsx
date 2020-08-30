import React, { ComponentType } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ContextOptions, FronteggProvider, PluginConfig } from '@frontegg/react-core';
import { AuthPlugin, DefaultAuthRoutes } from '@frontegg/react-auth';

const host =
  window.location.hostname === 'localhost' ||
  window.location.hostname === 'local.frontegg.com' ?
    `${window.location.hostname}:8080` : window.location.hostname;

const contextOptions: ContextOptions = {
  baseUrl: `${window.location.protocol}//${host}`,
  tokenResolver: () => 'my-authentication-token',
  requestCredentials: 'include',
};

const plugins: PluginConfig[] = [
  AuthPlugin({
    header: <div>TEST HEADER</div>,
    loaderComponent: <div>Loader</div>,
    routes: {
      authenticatedUrl: '/',
      loginUrl: '/account/login',
      logoutUrl: '/account/logout',
      activateUrl: '/account/activate',
      forgetPasswordUrl: '/account/forget-password',
      resetPasswordUrl: '/account/reset-password',
    },
  }),
];

export const withFrontegg = (Component: ComponentType<any>): ComponentType<any> => withRouter(class extends React.Component<RouteComponentProps> {
  render() {
    return <FronteggProvider
      history={this.props.history as any}
      context={contextOptions}
      plugins={plugins}>
      <DefaultAuthRoutes>
        <Component/>
      </DefaultAuthRoutes>
    </FronteggProvider>;
  }
});
