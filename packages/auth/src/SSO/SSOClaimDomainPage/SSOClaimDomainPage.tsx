import React, { FC } from 'react';
import { checkRootPath, Grid, Loader } from '@frontegg/react-core';
import { Route } from 'react-router-dom';
import { SSOClaimDomainForm } from './SSOClaimDomainForm';
import { SSOClaimDomainGuide } from './SSOClaimDomainGuide';
import { useAuth } from '../../hooks';
import { HideOption, RouteWrapper } from '../../interfaces';

export const SSOClaimDomainPage: FC<RouteWrapper & HideOption> = (props) => {
  const pagePath =
    props.path ?? checkRootPath('SSO.ClaimDomainPage must be rendered inside a SSO.Router component') + '/domain';

  const { loading } = useAuth((state) => state.ssoState);

  if (loading) {
    return <Loader center />;
  }
  const children = props.children ?? (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <SSOClaimDomainGuide />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SSOClaimDomainForm />
        </Grid>
      </Grid>
    </>
  );

  return (
    <Route path={pagePath}>
      <div className='fe-sso-claim-domain-page'>{children}</div>
    </Route>
  );
};
