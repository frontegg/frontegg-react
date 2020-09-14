import React, { FC } from 'react';
import { useT } from '@frontegg/react-core';

export const MFARecoveryCodeStepMessage: FC = (props) => {
  const { t } = useT();
  const children = props.children ?? <>{t('auth.mfa.recovery-code.message')}</>;

  return <div className='fe-section-title'>{children}</div>;
};
