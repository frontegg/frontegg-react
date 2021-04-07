import React, { FC } from 'react';
import { Loader, useT } from '@frontegg/react-core';
import { HideOption } from '../../interfaces';
import { useSSOState } from '@frontegg/react-hooks/auth';

export const SSONoDataPlaceholder: FC<HideOption> = (props) => {
  const { t } = useT();
  const { samlConfiguration, loading } = useSSOState(({ samlConfiguration, loading }) => ({
    samlConfiguration,
    loading,
  }));

  if (samlConfiguration?.enabled || props.hide) {
    return null;
  }
  if (loading) {
    return <Loader center />;
  }
  const children = props.children ?? t('auth.sso.overview.enable-sso-message');
  return (
    <div className='fe-placeholder-box'>
      <div className='fe-placeholder-box__inner'>
        <span>{children}</span>
      </div>
    </div>
  );
};
