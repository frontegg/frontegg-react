import React, { FC, useContext } from 'react';
import { useRootPath, useT, RendererFunctionFC, omitProps } from '@frontegg/react-core';
import { SSOStep } from './SSOStep';
import { useAuth } from '../../hooks';

export interface SSOOverviewStepsProps {
  renderer?: RendererFunctionFC<SSOOverviewStepsProps>;
}

export const SSOOverviewSteps: FC<SSOOverviewStepsProps> = (props) => {
  const { t } = useT();
  const [rootPath] = useRootPath(props);
  const { samlConfiguration } = useAuth((state) => state.ssoState);
  const { renderer } = props;
  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
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
        title={t('auth.sso.claim-domain')}
        subtitle={claimValue}
        configured={isDomainValidated}
      />
      <SSOStep
        num={2}
        t={t}
        to={`${rootPath}/idp`}
        title={t('auth.sso.configure-your-idp')}
        subtitle={idpValue}
        configured={isIdpValidated}
      />
    </div>
  );
};
