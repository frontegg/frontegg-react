import React, { FC } from 'react';
import { useT } from '@frontegg/react-core';
import { useAuthUser } from '../hooks';
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

export const MFALayout: FC = (props) => {
  const children = props.children ?? (
    <>
      <MFAStatus />
      <MFAButton />
    </>
  );
  return (
    <div className='fe-mfa-layout fe-card-container'>
      <div className='fe-card-content'>{children}</div>
    </div>
  );
};
