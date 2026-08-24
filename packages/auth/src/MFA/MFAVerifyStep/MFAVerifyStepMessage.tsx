import React, { FC } from 'react';
import { useT } from '@frontegg/react-core';

export const MFAVerifyStepMessage: FC = (props) => {
  const { t } = useT();
  const children = props.children ?? <>{t('auth.mfa.verify.message')}</>;

  return <div className='fe-section-title'>{children}</div>;
};
