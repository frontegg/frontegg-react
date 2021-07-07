import React, { ComponentType, useContext, useEffect } from 'react';
import { ContextOptions, FronteggProvider, PluginConfig } from '@frontegg/react-core';
import { AuthPlugin } from '@frontegg/react-auth';
import { ConnectivityPlugin } from '@frontegg/react-connectivity';
import { AuditsPlugin } from '@frontegg/react-audits';
import { uiLibrary } from '@frontegg/react-elements-material-ui';
import { FronteggStoreContext } from '@frontegg/react-hooks';
import { useTenantsActions } from '@frontegg/react-hooks/auth';
import { initialize } from '@frontegg/admin-portal';

const developmentHosts = ['localhost', 'local.frontegg.com'];
const host =
  developmentHosts.indexOf(window.location.hostname) !== -1
    ? `${window.location.hostname}:8080`
    : window.location.hostname;

const contextOptions: ContextOptions = {
  baseUrl: `https://david.frontegg.com`,
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

const ConnectAdminPortal = ({ children }: any) => {
  const { store } = useContext(FronteggStoreContext);

  useEffect(() => {
    initialize({
      version: 'next',
      contextOptions,
      customLoader: true,
      customLoginBox: true,
      store,
    });
  }, []);
  return <>{children}</>;
};
export const withFrontegg = (Component: ComponentType<any>) => () => (
  <FronteggProvider debugMode context={contextOptions} plugins={plugins} uiLibrary={uiLibrary}>
    <ConnectAdminPortal>
      <Component />
    </ConnectAdminPortal>
  </FronteggProvider>
);
