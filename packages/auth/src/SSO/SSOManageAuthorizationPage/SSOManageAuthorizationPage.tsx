import React, { FC, useEffect } from 'react';
import { checkRootPath, Grid, useT } from '@frontegg/react-core';
import { Route } from 'react-router-dom';
import { HideOption } from '../../interfaces';
import { useAuthSSOActions, useAuthSSOState } from '../hooks';
import { SSOManageAuthorizationForm } from './SSOManageAuthorizationForm';

export const SSOManageAuthorizationPage: FC<HideOption> = (props) => {
  const rootPath = checkRootPath('SSOManageAuthorizationPage must be rendered inside a SSORouter component');
  const { loading } = useAuthSSOState(({ loading }) => ({ loading }));
  const { loadSSOAllRoles, loadSSOAuthorizationRoles } = useAuthSSOActions();

  useEffect(() => {
    loadSSOAllRoles();
    loadSSOAuthorizationRoles();
  }, []);

  if (loading) {
    return null;
  }

  const prefixT = 'auth.sso.authorization';
  const Title: FC = (props) => {
    const { t } = useT();
    const children = props.children ?? t(`${prefixT}.title`);
    return <div className='fe-sso-authorization-page__title fe-mb-1'>{children}</div>;
  };

  const Subtitle: FC = (props) => {
    const { t } = useT();
    const children = props.children ?? t(`${prefixT}.subtitle`);
    return <div className='fe-sso-authorization-page__subtitle fe-mb-1'>{children}</div>;
  };

  const children = props.children ?? (
    <>
      <Title />
      <Subtitle />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12}>
          <SSOManageAuthorizationForm />
        </Grid>
      </Grid>
    </>
  );

  return (
    <Route path={`${rootPath}/authorization`}>
      <div className='fe-sso-authorization-page'>{children}</div>
    </Route>
  );
};
