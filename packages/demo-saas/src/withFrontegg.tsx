import React, { ComponentType } from 'react';
import { ContextOptions, FronteggProvider, PluginConfig } from '@frontegg/react-core';
import { AuthPlugin } from '@frontegg/react-auth';
import { IntegrationsPlugin } from '@frontegg/react-integrations';
import { NotificationsPlugin } from '@frontegg/react-notifications';
import { uiLibrary } from '@frontegg/react-elements-material-ui';

const developmentHosts = ['localhost', 'local.frontegg.com'];
const host =
  developmentHosts.indexOf(window.location.hostname) !== -1
    ? `${window.location.hostname}:8080`
    : window.location.hostname;

const contextOptions: ContextOptions = {
  baseUrl: `${window.location.protocol}//${host}`,
  requestCredentials: 'include',
};

const plugins: PluginConfig[] = [AuthPlugin({}), IntegrationsPlugin(), NotificationsPlugin({})];

export const withFrontegg = (Component: ComponentType<any>) => () => (
  <FronteggProvider debugMode context={contextOptions} plugins={plugins} uiLibrary={undefined}>
    <Component />
  </FronteggProvider>
);
