import React, { FC } from 'react';
import { HideOption, RouteWrapper } from '../interfaces';
import { checkRootPath, Loader } from '@frontegg/react-core';
import { Route } from 'react-router-dom';
import { SSOClaimDomainForm } from './SSOClaimDomainForm';
import { SSOClaimDomainGuide } from './SSOClaimDomainGuide';
import { useAuth } from '../../hooks';

export const SSOClaimDomainPage: FC<RouteWrapper & HideOption> = (props) => {
  const pagePath =
    props.path ?? checkRootPath('SSOClaimDomainPage must be rendered inside a SSORouter component') + '/domain';

  const { loading } = useAuth((state) => state.ssoState);

  if (loading) {
    return <Loader inline={false} />;
  }
  const children = props.children ?? (
    <>
      <SSOClaimDomainGuide />
      <SSOClaimDomainForm />
    </>
  );

  return (
    <Route path={pagePath}>
      <div className='fe-sso-claim-domain-page'>{children}</div>
    </Route>
  );
};
