import React, { FC } from 'react';
import { useT, Loader, checkRootPath } from '@frontegg/react-core';
import { SSOStep } from './SSOStep';
import { HideOption } from '../../interfaces';
import { useSSOState } from '@frontegg/react-hooks/auth';

export const SSOSteps: FC<HideOption> = (props) => {
  const { t } = useT();
  const rootPath = checkRootPath('SSOSteps should be rendered inside SSO component');
  const { samlConfiguration, loading, roles, authorizationRoles } = useSSOState(
    ({ samlConfiguration, loading, roles, authorizationRoles }) => ({
      samlConfiguration,
      loading,
      roles,
      authorizationRoles,
    })
  );

  if (!samlConfiguration?.enabled || props.hide) {
    return null;
  }
  if (loading) {
    return <Loader center />;
  }

  const isDomainValidated = samlConfiguration?.validated ?? false;
  const isIdpValidated = (samlConfiguration?.ssoEndpoint && isDomainValidated) as boolean;
  const isAuthorizationValidated = !!authorizationRoles?.length;
  const authorizationValue = roles
    ?.filter((r) => authorizationRoles?.find((ar) => ar === r.id))
    .map((v) => v.name)
    .slice(0, 2)
    .join(', ');
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
      <SSOStep
        num={3}
        t={t}
        optional
        to={`${rootPath}/authorization`}
        title={t('auth.sso.overview.manage-authorization')}
        subtitle={!!authorizationRoles?.length ? `${authorizationValue}...` : ''}
        configured={isAuthorizationValidated}
      />
    </div>
  );
};
