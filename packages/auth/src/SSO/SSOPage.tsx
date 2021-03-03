import React, { FC } from 'react';
import { SSORouter } from './SSORouter';
import { useRootPath, RootPathContext, useProxyComponent, ProxyComponent } from '@frontegg/react-core';
import { SSOHeader } from './SSOHeader';
import { BasePageProps } from '../interfaces';

export type SSOPageProps = BasePageProps & ProxyComponent;
export const SSOPage: FC<SSOPageProps> = (props) => {
  const [rootPath] = useRootPath(props, '/sso');
  const proxyPortals = useProxyComponent(props);

  const children = props.children ?? (
    <>
      <SSOHeader />
      <SSORouter />
    </>
  );

  return (
    <RootPathContext.Provider value={rootPath}>
      <div className='fe-sso-page'>
        {children}
        {proxyPortals}
      </div>
    </RootPathContext.Provider>
  );
};
