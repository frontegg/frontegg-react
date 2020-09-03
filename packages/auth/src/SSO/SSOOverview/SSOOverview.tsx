import React from 'react';
import {
  RendererFunction, withT, WithT, SwitchToggle, ISamlConfiguration, omitProps,
  ComponentsTypesWithProps, FronteggClass,
} from '@frontegg/react-core';
import { AuthActions, AuthState } from '../../Api';
import { withAuth } from '../../HOCs';
import { SSOOverviewEnablePlaceholder, SSOOverviewEnablePlaceholderProps } from './SSOOverviewEnablePlaceholder';
import { SSOOverviewSteps, SSOOverviewStepsProps } from './SSOOverviewSteps';

const stateMapper = ({ ssoState }: AuthState) => ({ ssoState });
const actionsMapper = ({ saveSSOConfigurations, setSSOState }: AuthActions) => ({ saveSSOConfigurations, setSSOState });

type Components = {
  SSOOverviewEnablePlaceholder: SSOOverviewEnablePlaceholderProps;
  SSOOverviewSteps: SSOOverviewStepsProps;
}

export interface SSOOverviewProps {
  renderer?: RendererFunction<SSOOverviewProps, Components>;
  components?: ComponentsTypesWithProps<Components>;
}

type Props = ReturnType<typeof stateMapper> & ReturnType<typeof actionsMapper> & WithT & SSOOverviewProps

class SSOOverviewComponent extends FronteggClass<Components, Props> {
  constructor(props: Props) {
    super(props, { SSOOverviewEnablePlaceholder, SSOOverviewSteps });
  }

  onEnabledDisabledChanged = () => {
    const { ssoState: { samlConfiguration }, setSSOState, saveSSOConfigurations } = this.props;

    const newConfig: ISamlConfiguration = {
      ...samlConfiguration,
      enabled: !samlConfiguration?.enabled,
    };

    const firstTimeConfigure = !samlConfiguration?.domain;
    if (firstTimeConfigure) {
      setSSOState({ samlConfiguration: newConfig });
    } else {
      saveSSOConfigurations(newConfig);
    }
  };

  render() {
    const { t, renderer, ssoState: { samlConfiguration } } = this.props;
    const { SSOOverviewEnablePlaceholder, SSOOverviewSteps } = this.comps;
    if (renderer) {
      return renderer(omitProps(this.props, ['renderer', 'components']), this.comps);
    }
    const samlEnabled = samlConfiguration?.enabled ?? false;
    return <div className='fe-sso-overview'>
      <div className='fe-center'>
        <SwitchToggle
          value={samlEnabled}
          labels={[t('common.disabled'), t('common.enabled')]}
          onChange={this.onEnabledDisabledChanged}/>
      </div>

      {samlEnabled ? <SSOOverviewSteps/> : <SSOOverviewEnablePlaceholder/>}
    </div>;
  }
}


export const SSOOverview = withAuth(withT()(SSOOverviewComponent), stateMapper, actionsMapper);
