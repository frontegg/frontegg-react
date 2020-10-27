import React, { FC } from 'react';
import { useT, Loader, checkRootPath } from '@frontegg/react-core';
import { SSOStep } from './SSOStep';
import { useAuth } from '../../hooks';
import { HideOption } from '../../interfaces';
import { useAuthSSOState } from '../hooks';

export const SSOSteps: FC<HideOption> = (props) => {
  const { t } = useT();
  const rootPath = checkRootPath('SSOSteps should be rendered inside SSO component');
  const { samlConfiguration, loading } = useAuthSSOState(({ samlConfiguration, loading }) => ({
    samlConfiguration,
    loading,
  }));

  if (!samlConfiguration?.enabled || props.hide) {
    return null;
  }
  if (loading) {
    return <Loader center />;
  }

  const isDomainValidated = samlConfiguration?.validated ?? false;
  const isIdpValidated = (samlConfiguration?.ssoEndpoint && isDomainValidated) as boolean;
  const claimValue = samlConfiguration?.domain ?? '';
  const idpValue = samlConfiguration?.acsUrl ?? '';

  return (
    <div className='fe-sso-steps'>
      <SSOStep
        num={1}
        t={t}
        to={`${rootPath}/domain`}
        title={t('auth.sso.overview.claim-domain')}
        subtitle={claimValue}
        configured={isDomainValidated}
      />
      <SSOStep
        num={2}
        t={t}
        to={`${rootPath}/idp`}
        title={t('auth.sso.overview.configure-your-idp')}
        subtitle={idpValue}
        configured={isIdpValidated}
      />
    </div>
  );
};
