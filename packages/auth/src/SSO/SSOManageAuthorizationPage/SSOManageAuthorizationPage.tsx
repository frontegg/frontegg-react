import React, { FC, useEffect } from 'react';
import { checkRootPath, Grid } from '@frontegg/react-core';
import { Route } from 'react-router-dom';
import { HideOption, RouteWrapper } from '../../interfaces';
import { useSSOActions, useSSOState } from '../hooks';
import { SSOManageAuthorizationForm } from './SSOManageAuthorizationForm';
import { reloadSSOIfNeeded } from '../helpers';

export const SSOManageAuthorizationComponent: FC<HideOption> = (props) => {
  reloadSSOIfNeeded();
  const { loading } = useSSOState(({ loading }) => ({ loading }));
  const { loadSSOAllRoles, loadSSOAuthorizationRoles } = useSSOActions();

  useEffect(() => {
    loadSSOAllRoles();
    loadSSOAuthorizationRoles();
  }, []);

  if (loading) {
    return null;
  }

  const children = props.children ?? (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12}>
        <SSOManageAuthorizationForm />
      </Grid>
    </Grid>
  );

  return <div className='fe-sso-authorization-page'>{children}</div>;
};
export const SSOManageAuthorizationPage: FC<RouteWrapper & HideOption> = (props) => {
  const pagePath =
    props.path ??
    checkRootPath('SSO.ManageAuthorizationPage must be rendered inside a SSO.Router component') + '/authorization';

  return (
    <Route path={pagePath}>
      <SSOManageAuthorizationComponent children={props.children} />
    </Route>
  );
};
