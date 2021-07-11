import React, { ComponentType, useContext, useEffect, useRef } from 'react';
import { ContextOptions, FronteggProvider, PluginConfig } from '@frontegg/react-core';
import { AuthPlugin } from '@frontegg/react-auth';
import { ConnectivityPlugin } from '@frontegg/react-connectivity';
import { AuditsPlugin } from '@frontegg/react-audits';
import { uiLibrary } from '@frontegg/react-elements-material-ui';
import { FronteggStoreContext } from '@frontegg/react-hooks';
import { initialize } from '@frontegg/admin-portal';

const contextOptions: ContextOptions = {
  baseUrl: `https://david.frontegg.com`,
  requestCredentials: 'include',
  auditsOptions: {
    virtualScroll: true,
  },
};

const plugins: PluginConfig[] = [AuthPlugin(), ConnectivityPlugin(), AuditsPlugin()];

const ConnectAdminPortal = ({ children }: any) => {
  const appRef = useRef<any>(null);
  const { store } = useContext(FronteggStoreContext);

  useEffect(() => {
    appRef.current =
      store &&
      initialize({
        version: 'next',
        contextOptions,
        customLoader: true,
        customLoginBox: true,
        store,
        cdn: 'http://localhost:5000',
        usingFronteggReactCore: true,
      } as any);
  }, [store]);
  return <>{children}</>;
};
export const withFrontegg = (Component: ComponentType<any>) => () => (
  <FronteggProvider debugMode context={contextOptions} plugins={plugins} uiLibrary={uiLibrary}>
    <ConnectAdminPortal>
      <Component />
    </ConnectAdminPortal>
  </FronteggProvider>
);
