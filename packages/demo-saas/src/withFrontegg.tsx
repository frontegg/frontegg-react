import React, { ComponentType } from 'react';
import { ContextOptions, FronteggProvider, PluginConfig } from '@frontegg/react-core';
import { AuthPlugin } from '@frontegg/react-auth';
import { ConnectivityPlugin } from '@frontegg/react-connectivity';
import { AuditsPlugin } from '@frontegg/react-audits';
import { uiLibrary } from '@frontegg/react-elements-material-ui';
const developmentHosts = ['localhost', 'local.frontegg.com'];
const host =
  developmentHosts.indexOf(window.location.hostname) !== -1
    ? `${window.location.hostname}:8080`
    : window.location.hostname;

const contextOptions: ContextOptions = {
  baseUrl: `https://maxx.stg.frontegg.com`,
  requestCredentials: 'include',
  auditsOptions: {
    virtualScroll: true,
  },
};

const plugins: PluginConfig[] = [
  AuthPlugin(),
  ConnectivityPlugin(),
  // NotificationsPlugin(),
  AuditsPlugin(),
];

export const withFrontegg = (Component: ComponentType<any>) => () => (
  <FronteggProvider debugMode context={contextOptions} plugins={plugins} uiLibrary={uiLibrary}>
    <Component />
  </FronteggProvider>
);
