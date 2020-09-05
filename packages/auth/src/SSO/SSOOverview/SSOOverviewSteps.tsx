import React, { ComponentType } from 'react';
import { WithT, withT, RendererFunction, omitProps } from '@frontegg/react-core';
import { AuthState } from '../../Api';
import { withAuth } from '../../HOCs';
import { SSOStep } from './SSOStep';

const stateMapper = ({ ssoState }: AuthState) => ({ ssoState });

export interface SSOOverviewStepsProps {
  renderer?: RendererFunction<SSOOverviewStepsProps>;
}

type Props = ReturnType<typeof stateMapper> & WithT & SSOOverviewStepsProps

class SSOOverviewStepsComponent extends React.Component<Props> {
  render() {
    const { t, renderer, ssoState: { samlConfiguration } } = this.props;
    if (renderer) {
      return renderer(omitProps(this.props, ['renderer']));
    }

    const isDomainValidated = samlConfiguration?.validated ?? false;
    const isIdpValidated = (samlConfiguration?.ssoEndpoint && isDomainValidated) as boolean;
    const claimValue = samlConfiguration?.domain ?? '';
    const idpValue = samlConfiguration?.acsUrl ?? '';

    return <div className='fe-sso-steps'>
      <SSOStep num={1}
               t={t}
               to={`/sso/domain`}
               title={t('auth.sso.claim-domain')}
               subtitle={claimValue}
               configured={isDomainValidated}
      />

      <SSOStep num={2}
               t={t}
               to={`/sso/idp`}
               title={t('auth.sso.configure-your-idp')}
               subtitle={idpValue}
               configured={isIdpValidated}
      />
    </div>;
  }
}

export const SSOOverviewSteps = withAuth(withT()(SSOOverviewStepsComponent), stateMapper) as ComponentType<SSOOverviewStepsProps>;
