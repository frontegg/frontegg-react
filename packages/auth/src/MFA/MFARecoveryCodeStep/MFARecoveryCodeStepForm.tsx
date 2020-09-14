import React, { FC, useEffect, useState } from 'react';
import { FInput, Loader, useT, Icon } from '@frontegg/react-core';
import { useAuth } from '../../hooks';
import classNames from 'classnames';
import copy from 'clipboard-copy';

export const MFARecoveryCodeStepForm: FC = (props) => {
  const { t } = useT();
  const { recoveryCode } = useAuth((state) => state.mfaState);
  const [copiedMgsVisible, setCopiedMgsVisible] = useState(false);

  const copyRecoverCode = () => {
    copy(recoveryCode ?? '').then(displayCopiedMessage);
  };

  const displayCopiedMessage = () => {
    setCopiedMgsVisible(true);
    setTimeout(() => {
      setCopiedMgsVisible(false);
    }, 1000);
  };

  const children = props.children ?? (
    <>
      <div>Your recovery code</div>

      <div className={classNames('fe-mfa__recovery-code', { copied: copiedMgsVisible })} onClick={copyRecoverCode}>
        <span>{copiedMgsVisible ? t('copied') : recoveryCode}</span>
        <Icon name='copy' />
      </div>

      <div className='fe-mfa__recovery-note'>
        <Icon name='warning' />
        <span>{t('auth.mfa.recover-code.copy-and-save-code')}</span>
      </div>
    </>
  );

  return <>{children}</>;
};
