import { useEffect } from 'react';
import { validateRequired, validateSchemaSync, validateUrl } from '@frontegg/react-core';
import { SSOActions } from '@frontegg/redux-store/auth';
import { useSSOActions, useSSOState } from '@frontegg/react-hooks/auth';
import { SamlVendors } from './SSOConfigureIDPPage/SSOVendors';
import { IInitialValues } from './SSOConfigureIDPPage/SSOConfigureIDPForm';

export interface IssoConfigureIdpFormValidation extends IInitialValues {
  t: any;
  samlVendor: SamlVendors;
}

export interface IssoConfigureIdpFormSubmit extends IInitialValues {
  samlVendor: SamlVendors;
  saveSSOConfigurations: SSOActions['saveSSOConfigurations'];
  saveSSOConfigurationsFile: SSOActions['saveSSOConfigurationsFile'];
}

export const reloadSSOIfNeeded = () => {
  const { samlConfiguration, loading } = useSSOState(({ samlConfiguration, loading }) => ({
    samlConfiguration,
    loading,
  }));
  const { loadSSOConfigurations } = useSSOActions();
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
  if (configSaml === 'auto' && samlVendor !== SamlVendors.Oidc) {
    return validateSchemaSync(
      {
        configFile: validateRequired(t('auth.sso.form.metadata-file'), t),
      },
      { configFile }
    );
  } else if (samlVendor === SamlVendors.Oidc) {
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
  } else if (samlVendor === SamlVendors.Oidc) {
    saveSSOConfigurations?.({
      oidcClientId,
      oidcSecret,
      samlVendor: SamlVendors.Oidc,
    } as any);
  } else {
    saveSSOConfigurations?.({
      ssoEndpoint,
      publicCertificate,
    });
  }
};
