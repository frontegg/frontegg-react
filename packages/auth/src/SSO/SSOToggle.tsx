import React, { FC } from 'react';
import { SwitchToggle, SwitchToggleProps, useT } from '@frontegg/react-core';
import { useAuth } from '../hooks';
import { reloadSSOIfNeeded } from './helpers';
import { HideOption } from '../interfaces';

export const SSOToggle: FC<SwitchToggleProps & HideOption> = (props) => {
  reloadSSOIfNeeded();
  const { samlConfiguration, loading, saveSSOConfigurations } = useAuth((state) => state.ssoState);
  const { t } = useT();
  if (props.hide) {
    return null;
  }
  const samlEnabled = samlConfiguration?.enabled ?? false;
  const onEnabledDisabledChanged = () => {
    saveSSOConfigurations({ ...samlConfiguration, enabled: !samlConfiguration?.enabled });
  };
  return (
    <div className='fe-center fe-mt-2'>
      <SwitchToggle
        loading={loading}
        value={samlEnabled}
        labels={[t('common.disabled'), t('common.enabled')]}
        onChange={onEnabledDisabledChanged}
        {...props}
      />
    </div>
  );
};
