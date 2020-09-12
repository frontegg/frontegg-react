import React, { FC } from 'react';
import { Loader, useT } from '@frontegg/react-core';
import { useAuth } from '../../hooks';
import { HideOption } from '../interfaces';

export const SSONoDataPlaceholder: FC<HideOption> = (props) => {
  const { t } = useT();
  const { samlConfiguration, loading } = useAuth((state) => state.ssoState);
  if (samlConfiguration?.enabled || props.hide) {
    return null;
  }
  if (loading) {
    return <Loader inline={false} />;
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
