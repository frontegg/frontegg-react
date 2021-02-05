import React, { FC } from 'react';
import { checkRootPath, Grid } from '@frontegg/react-core';
import { Route } from 'react-router-dom';
import { SSOClaimDomainForm } from './SSOClaimDomainForm';
import { SSOClaimDomainGuide } from './SSOClaimDomainGuide';
import { HideOption, RouteWrapper } from '../../interfaces';
import { useSSOState } from '../hooks';
import { reloadSSOIfNeeded } from '../helpers';

export const SSOClaimDomainComponent: FC = (props) => {
  reloadSSOIfNeeded();
  const { loading } = useSSOState(({ loading }) => ({ loading }));

  if (loading) {
    return null;
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

  return <div className='fe-sso-claim-domain-page'>{children}</div>;
};

export const SSOClaimDomainPage: FC<RouteWrapper & HideOption> = (props) => {
  const pagePath =
    props.path ?? checkRootPath('SSO.ClaimDomainPage must be rendered inside a SSO.Router component') + '/domain';

  return (
    <Route path={pagePath}>
      <SSOClaimDomainComponent children={props.children} />
    </Route>
  );
};
