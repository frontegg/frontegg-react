import React, { FC } from 'react';
import { Button, FButton, useDialog } from '@frontegg/react-core';
import { useAuth } from '../../hooks';

export const MFAVerifyStepFooter: FC = (props) => {
  const { loading } = useAuth((state) => state.mfaState);
  const { onClose } = useDialog();
  return (
    <div className='fe-dialog__footer'>
      <Button isCancel onClick={onClose}>
        Cancel
      </Button>
      <FButton type='submit' fullWidth={false} variant='primary' loading={loading}>
        Verify
      </FButton>
    </div>
  );
};
