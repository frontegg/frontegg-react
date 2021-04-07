import React, { FC, useCallback } from 'react';
import { SwitchToggle, SwitchToggleProps, useT } from '@frontegg/react-core';
import { reloadSSOIfNeeded } from './helpers';
import { HideOption } from '../interfaces';
import { useSSOActions, useSSOState } from '@frontegg/react-hooks/auth';

export const SSOToggle: FC<SwitchToggleProps & HideOption> = (props) => {
  reloadSSOIfNeeded();
  const { samlConfiguration, loading } = useSSOState();
  const { saveSSOConfigurations } = useSSOActions();

  const { t } = useT();
  if (props.hide) {
    return null;
  }
  const samlEnabled = samlConfiguration?.enabled ?? false;
  const onEnabledDisabledChanged = useCallback(() => {
    saveSSOConfigurations({ ...samlConfiguration, enabled: !samlConfiguration?.enabled });
  }, [samlConfiguration]);

  return (
    <div className='fe-center fe-mt-4'>
      <SwitchToggle
        data-test-id='sso-toggle'
        loading={loading}
        value={samlEnabled}
        labels={[t('common.disabled'), t('common.enabled')]}
        onChange={onEnabledDisabledChanged}
        {...props}
      />
    </div>
  );
};
