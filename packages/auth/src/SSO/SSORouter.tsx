import React, { FC } from 'react';
import { checkValidChildren, RootPathContext } from '@frontegg/react-core';
import { SSOOverviewPage as OverviewPage } from './SSOOverviewPage';
import { SSOClaimDomainPage as ClaimDomainPage } from './SSOClaimDomainPage';
import { SSOConfigureIDPPage as ConfigureIDPPage } from './SSOConfigureIDPPage';
import { useRootPath } from '@frontegg/react-core';
import { BasePageProps } from './interfaces';
import { reloadSSOIfNeeded } from './helpers';
import { SSOToggle } from './SSOToggle';

export type SSOSubComponents = {
  OverviewPage: typeof OverviewPage;
  ClaimDomainPage: typeof ClaimDomainPage;
  ConfigureIDPPage: typeof ConfigureIDPPage;
};
export type SSOProps = BasePageProps;

const SSORouter: FC<SSOProps> & SSOSubComponents = (props) => {
  const [rootPath, isRootPathContext] = useRootPath(props, '/sso');
  reloadSSOIfNeeded();
  checkValidChildren('SSO.Router', 'SSO', props.children, {
    SSOToggle,
    OverviewPage,
    ClaimDomainPage,
    ConfigureIDPPage,
  });

  const children = props.children ?? (
    <>
      <SSOToggle />
      <OverviewPage />
      <ClaimDomainPage />
      <ConfigureIDPPage />
    </>
  );

  if (!isRootPathContext) {
    return <RootPathContext.Provider value={rootPath}>{children}</RootPathContext.Provider>;
  }
  return <>{children}</>;
};

SSORouter.OverviewPage = OverviewPage;
SSORouter.ClaimDomainPage = ClaimDomainPage;
SSORouter.ConfigureIDPPage = ConfigureIDPPage;

export { SSORouter };
