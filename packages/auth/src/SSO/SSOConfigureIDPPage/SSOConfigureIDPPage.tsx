import React, { FC, useState } from 'react';
import { checkRootPath, Loader, Grid } from '@frontegg/react-core';
import { Route } from 'react-router-dom';
import { HideOption, RouteWrapper } from '../../interfaces';
import { SSOConfigureIDPGuide } from './SSOConfigureIDPGuide';
import { SSOConfigureIDPForm } from './SSOConfigureIDPForm';
import { SSOConfigureIDPSelect } from './SSOConfigureIDPSelect';
import { SamlVendors } from './SSOVendors';
import { useAuthSSOState } from '../hooks';
import { reloadSSOIfNeeded } from '../helpers';

export const SSOConfigureIDPComponent: FC = (props) => {
  reloadSSOIfNeeded();
  const { loading } = useAuthSSOState(({ loading }) => ({ loading }));
  const [samlVendor, setSamlVendor] = useState<SamlVendors>(SamlVendors.Saml);
  if (loading) {
    return null;
  }

  const children = props.children ?? (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={4} md={3}>
        <SSOConfigureIDPSelect samlVendor={samlVendor} setSamlVendor={setSamlVendor} />
      </Grid>
      <Grid item xs={12} sm={8} md={4}>
        <SSOConfigureIDPGuide samlVendor={samlVendor} />
      </Grid>
      <Grid item xs={12} sm={12} md={5}>
        <SSOConfigureIDPForm samlVendor={samlVendor} />
      </Grid>
    </Grid>
  );

  return <div className='fe-sso-idp-page'>{children}</div>;
};

export const SSOConfigureIDPPage: FC<RouteWrapper & HideOption> = (props) => {
  const pagePath = props.path ?? checkRootPath('SSO.ConfigureIDPPage must be rendered inside a SSO.Router component') + '/idp';

  return <Route path={pagePath}>
    <SSOConfigureIDPComponent children={props.children} />
  </Route>;
};
