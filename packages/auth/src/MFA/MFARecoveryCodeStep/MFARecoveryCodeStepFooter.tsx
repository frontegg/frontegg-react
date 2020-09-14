import React, { FC } from 'react';
import { Button, useDialog, useT } from '@frontegg/react-core';

export const MFARecoveryCodeStepFooter: FC = (props) => {
  const { t } = useT();
  const { onClose } = useDialog();
  return (
    <div className='fe-dialog__footer'>
      <Button variant='primary' onClick={onClose}>
        {t('common.done')}
      </Button>
    </div>
  );
};
