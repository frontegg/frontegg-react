import React, { FC } from 'react';
import { Button, FButton, useDialog, useT } from '@frontegg/react-core';
import { useAuthMfaState } from '../hooks';

export const MFAVerifyStepFooter: FC = (props) => {
  const { loading } = useAuthMfaState(({ loading }) => ({ loading }));
  const { onClose } = useDialog();
  const { t } = useT();
  return (
    <div className='fe-dialog__footer'>
      <Button className='fe-mr-2' isCancel onClick={onClose}>
        {t('common.cancel')}
      </Button>
      <FButton type='submit' fullWidth={false} variant='primary' loading={loading}>
        {t('common.verify')}
      </FButton>
    </div>
  );
};
