import React, { ComponentType } from 'react';
import { ContextOptions, FronteggProvider, PluginConfig } from '@frontegg/react-core';
import { AuthPlugin } from '@frontegg/react-auth';
import { uiLibrary } from '@frontegg/react-elements-semantic';
// import { uiLibrary } from '@frontegg/react-elements-material-ui';

const developmentHosts = ['localhost', 'local.frontegg.com'];
const host =
  developmentHosts.indexOf(window.location.hostname) !== -1
    ? `${window.location.hostname}:8080`
    : window.location.hostname;

const contextOptions: ContextOptions = {
  baseUrl: `${window.location.protocol}//${host}`,
  requestCredentials: 'include',
};

const plugins: PluginConfig[] = [
  AuthPlugin({
    injectAuthRoutes: false,
  }),
];

export const withFrontegg = (Component: ComponentType<any>) => () => (
  <FronteggProvider withRouter={false} context={contextOptions} plugins={plugins} uiLibrary={uiLibrary}>
    <Component />
  </FronteggProvider>
);
