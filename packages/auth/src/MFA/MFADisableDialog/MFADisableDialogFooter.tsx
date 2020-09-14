import React, { FC } from 'react';
import { Button, FButton, useDialog, useT } from '@frontegg/react-core';
import { useAuth } from '../../hooks';

export const MFADisableDialogFooter: FC = (props) => {
  const { t } = useT();
  const { loading } = useAuth((state) => state.mfaState);
  const { onClose } = useDialog();
  return (
    <div className='fe-dialog__footer'>
      <Button isCancel onClick={onClose}>
        Cancel
      </Button>
      <FButton type='submit' fullWidth={false} variant='danger' loading={loading}>
        {t('common.disable')}
      </FButton>
    </div>
  );
};
