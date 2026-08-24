import React, { FC } from 'react';
import { useT, useProxyComponent, ProxyComponent } from '@frontegg/react-core';
import { useAuthUser } from '@frontegg/react-hooks/auth';
import { MFAButton } from './MFAButton';

const MFAStatus = () => {
  const user = useAuthUser();
  const { t } = useT();
  return (
    <div className='fe-mfa__content-title'>
      {user.mfaEnrolled ? (
        <>
          {t('auth.mfa.two-factor')}: <span>{t('common.enabled')}</span>
        </>
      ) : (
        t('auth.mfa.enable-message')
      )}
    </div>
  );
};

export interface MFALayoutProps extends ProxyComponent {}

export const MFALayout: FC<MFALayoutProps> = (props) => {
  const proxyPortals = useProxyComponent(props);
  const children = props.children ?? (
    <>
      <MFAStatus />
      <MFAButton />
    </>
  );
  return (
    <div className='fe-mfa-layout fe-card-container'>
      <div className='fe-card-content'>{children}</div>

      {proxyPortals}
    </div>
  );
};
