import React, { ComponentType } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ContextOptions, FronteggProvider, PluginConfig } from '@frontegg/react-core';
import { AuthPlugin } from '@frontegg/react-auth';
import { uiLibrary } from '@frontegg/react-elements-semantic';

const host =
  window.location.hostname === 'localhost' ||
  window.location.hostname === 'local.frontegg.com' ?
    `${window.location.hostname}:8080` : window.location.hostname;

const contextOptions: ContextOptions = {
  baseUrl: `${window.location.protocol}//${host}`,
  requestCredentials: 'include',
};

const plugins: PluginConfig[] = [
  AuthPlugin(),
];

export const withFrontegg = (Component: ComponentType<any>): ComponentType<any> => withRouter(class extends React.Component<RouteComponentProps> {
  render() {
    return <FronteggProvider
      context={contextOptions}
      plugins={plugins}
      uiLibrary={uiLibrary}>
      <Component/>
    </FronteggProvider>;
  }
});
