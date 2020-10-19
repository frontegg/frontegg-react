import React, { FC } from 'react';
import { checkRootPath, Loader, Grid } from '@frontegg/react-core';
import { Route } from 'react-router-dom';
import { HideOption } from '../../interfaces';
import { useAuth } from '../../hooks';
import { SSOConfigureIDPGuide } from './SSOConfigureIDPGuide';
import { SSOConfigureIDPForm } from './SSOConfigureIDPForm';
import { SSOConfigureIDPSelect } from './SSOConfigureIDPSelect';

export const SSOConfigureIDPPage: FC<HideOption> = (props) => {
  const rootPath = checkRootPath('SSOConfigureIDPPage must be rendered inside a SSORouter component');

  const { loading } = useAuth((state) => state.ssoState);

  if (loading) {
    return <Loader center />;
  }

  const children = props.children ?? (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={4} md={3}>
        <SSOConfigureIDPSelect />
      </Grid>
      <Grid item xs={12} sm={8} md={4}>
        <SSOConfigureIDPGuide />
      </Grid>
      <Grid item xs={12} sm={12} md={5}>
        <SSOConfigureIDPForm />
      </Grid>
    </Grid>
  );

  return (
    <Route path={`${rootPath}/idp`}>
      <div className='fe-sso-idp-page'>{children}</div>
    </Route>
  );
};
