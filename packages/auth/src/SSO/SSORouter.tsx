import React, { FC } from 'react';
import { checkValidChildren, RootPathContext, useRootPath } from '@frontegg/react-core';
import { SSOOverviewPage } from './SSOOverviewPage';
import { SSOClaimDomainPage } from './SSOClaimDomainPage';
import { SSOConfigureIDPPage } from './SSOConfigureIDPPage';
import { SSOManageAuthorizationPage } from './SSOManageAuthorizationPage';
import { reloadSSOIfNeeded } from './helpers';
import { SSOToggle } from './SSOToggle';
import { BasePageProps } from '../interfaces';

export type SSOProps = BasePageProps;

const SSORouter: FC<SSOProps> = (props) => {
  const [rootPath, isRootPathContext] = useRootPath(props, '/sso');
  reloadSSOIfNeeded();
  checkValidChildren('SSO.Router', 'SSO', props.children, {
    SSOOverviewPage,
    SSOClaimDomainPage,
    SSOConfigureIDPPage,
    SSOManageAuthorizationPage,
  });

  const children = props.children ?? (
    <>
      <SSOToggle />
      <SSOOverviewPage />
      <SSOClaimDomainPage />
      <SSOConfigureIDPPage />
      <SSOManageAuthorizationPage />
    </>
  );

  if (!isRootPathContext) {
    return <RootPathContext.Provider value={rootPath}>{children}</RootPathContext.Provider>;
  }
  return <>{children}</>;
};

export { SSORouter };
