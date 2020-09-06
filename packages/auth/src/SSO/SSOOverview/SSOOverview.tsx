import React, { FC, ReactElement } from 'react';
import {
  RendererFunction, SwitchToggle, ISamlConfiguration, omitProps,
  ComponentsTypesWithProps, useT,
} from '@frontegg/react-core';
import { SSOOverviewEnablePlaceholder, SSOOverviewEnablePlaceholderProps } from './SSOOverviewEnablePlaceholder';
import { SSOOverviewSteps, SSOOverviewStepsProps } from './SSOOverviewSteps';
import { useDynamicComponents } from '@frontegg/react-core';
import { useAuth } from '../../hooks';

type Components = {
  SSOOverviewEnablePlaceholder: SSOOverviewEnablePlaceholderProps;
  SSOOverviewSteps: SSOOverviewStepsProps;
}

export interface SSOOverviewProps {
  renderer?: RendererFunction<SSOOverviewProps, Components, ReactElement>;
  components?: ComponentsTypesWithProps<Components>;
}

const defaultComponents = { SSOOverviewEnablePlaceholder, SSOOverviewSteps };
export const SSOOverview: FC<SSOOverviewProps> = (props) => {
  const Dynamic = useDynamicComponents(defaultComponents, props);
  const { t } = useT();
  const { samlConfiguration, loading, setSSOState, saveSSOConfigurations } = useAuth(state => state.ssoState);
  const { renderer } = props;

  const onEnabledDisabledChanged = () => {
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
  const samlEnabled = samlConfiguration?.enabled ?? false;

  if (renderer) {
    return renderer(omitProps(props, ['renderer', 'components']), Dynamic);
  }

  return <div>
    <div className='fe-center'>
      <SwitchToggle
        loading={loading}
        value={samlEnabled}
        labels={[t('common.disabled'), t('common.enabled')]}
        onChange={onEnabledDisabledChanged}/>
    </div>
    {samlEnabled ? <SSOOverviewSteps/> : <SSOOverviewEnablePlaceholder/>}
  </div>;
};
