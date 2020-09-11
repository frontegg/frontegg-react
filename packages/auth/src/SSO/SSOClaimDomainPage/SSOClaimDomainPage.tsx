import React, { FC } from 'react';
import { HideOption, RouteWrapper } from '../interfaces';
import { checkRootPath } from '@frontegg/react-core';
import { Route } from 'react-router-dom';

export const SSOClaimDomainPage: FC<RouteWrapper & HideOption> = (props) => {
  const pagePath =
    props.path ?? checkRootPath('SSOClaimDomainPage must be rendered inside a SSORouter component') + '/domain';

  const children = props.children ?? (
    <>
      {/*<SSOClaimDomainGuide />*/}
      {/*<SSOClaimDomainForm />*/}
    </>
  );

  return (
    <Route path={pagePath}>
      <div className='fe-sso-claim-domain-page'>{children}</div>
    </Route>
  );
};
