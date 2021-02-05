import React, { FC, useState } from 'react';
import { useT, Icon } from '@frontegg/react-core';
import classNames from 'classnames';
import copy from 'clipboard-copy';
import { useMfaState } from '../hooks';

export const MFARecoveryCodeStepForm: FC = (props) => {
  const { t } = useT();
  const { recoveryCode } = useMfaState(({ recoveryCode }) => ({ recoveryCode }));
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
        <span>{copiedMgsVisible ? t('common.copied') : recoveryCode}</span>
        <Icon name='copy' />
      </div>

      <div className='fe-mfa__recovery-note'>
        <Icon name='warning' />
        <span>{t('auth.mfa.recovery-code.copy-and-save-code')}</span>
      </div>
    </>
  );

  return <>{children}</>;
};
