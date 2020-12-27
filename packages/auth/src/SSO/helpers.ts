import { useEffect } from 'react';
import { useAuthSSOActions, useAuthSSOState } from './hooks';
import { SamlVendors } from './SSOConfigureIDPPage/SSOVendors';
import { IInitialValues } from './SSOConfigureIDPPage/SSOConfigureIDPForm';
import { validateUrl, validateRequired, validateSchemaSync } from '@frontegg/react-core';
import { ssoActions } from '../Api/SSOState';

export interface IssoConfigureIdpFormValidation extends IInitialValues {
  t: any;
  samlVendor: SamlVendors;
}
export interface IssoConfigureIdpFormSubmit extends IInitialValues {
  samlVendor: SamlVendors;
  saveSSOConfigurations: typeof ssoActions.saveSSOConfigurations;
  saveSSOConfigurationsFile: typeof ssoActions.saveSSOConfigurationsFile;
}

export const reloadSSOIfNeeded = () => {
  const { samlConfiguration, loading } = useAuthSSOState(({ samlConfiguration, loading }) => ({
    samlConfiguration,
    loading,
  }));
  const { loadSSOConfigurations } = useAuthSSOActions();
  useEffect(() => {
    if (loading && !samlConfiguration) {
      loadSSOConfigurations();
    }
  }, []);
};

export const ssoConfigureIdpFormValidation = ({
  configSaml,
  configFile,
  ssoEndpoint,
  publicCertificate,
  oidcClientId,
  oidcSecret,
  samlVendor,
  t,
}: IssoConfigureIdpFormValidation) => {
  if (configSaml === 'auto' && samlVendor !== 'Oidc') {
    return validateSchemaSync(
      {
        configFile: validateRequired(t('auth.sso.form.metadata-file'), t),
      },
      { configFile }
    );
  } else if (samlVendor === 'Oidc') {
    return validateSchemaSync(
      {
        oidcClientId: validateRequired(t('common.clientId'), t),
        oidcSecret: validateRequired(t('common.secretKey'), t),
      },
      { oidcClientId, oidcSecret }
    );
  } else {
    return validateSchemaSync(
      {
        ssoEndpoint: validateUrl(t('auth.sso.idp.form.endpoint'), t),
        publicCertificate: validateRequired(t('auth.sso.idp.form.certificate'), t),
      },
      { ssoEndpoint, publicCertificate }
    );
  }
};

export const ssoConfigureIdpFormSubmit = ({
  ssoEndpoint,
  configSaml,
  publicCertificate,
  configFile,
  oidcClientId,
  oidcSecret,
  saveSSOConfigurations,
  saveSSOConfigurationsFile,
  samlVendor,
}: IssoConfigureIdpFormSubmit) => {
  if (configSaml === 'auto') {
    saveSSOConfigurationsFile?.(configFile!);
  } else if (samlVendor === 'Oidc') {
    saveSSOConfigurations?.({
      oidcClientId,
      oidcSecret,
      samlVendor,
    });
  } else {
    saveSSOConfigurations?.({
      ssoEndpoint,
      publicCertificate,
    });
  }
};
