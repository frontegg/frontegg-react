import React, { FC, MouseEventHandler, ReactElement, useContext, useEffect, useMemo, useState } from 'react';
import { Button, ButtonProps, checkValidChildren, useT } from '@frontegg/react-core';
import { MFAEnrollDialog } from './MFAEnrollDialog';
import { MFADisableDialog } from './MFADisableDialog';
import { useAuth } from '../hooks';
import { MFAButton } from './MFAButton';

const MFAStatus = () => {
  const { user } = useAuth(({ user }) => ({ user }));
  const { t } = useT();
  return (
    <div className='fe-mfa__content-title'>
      {user?.mfaEnrolled ? (
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
  const { t } = useT();
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
