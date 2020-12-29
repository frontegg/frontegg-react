import React, { FC } from 'react';
import { Button, FButton, FForm, Grid, useDialog, useT } from '@frontegg/react-core';
import { useAuthMfaState } from '../hooks';

export const MFAVerifyStepFooter: FC = () => {
  const { loading } = useAuthMfaState(({ loading }) => ({ loading }));
  const { onClose } = useDialog();
  const { t } = useT();
  return (
    <div className='fe-dialog__footer'>
      <Grid container>
        <Grid xs item>
          <Button size='large' isCancel fullWidth={false} disabled={loading} onClick={onClose}>
            {t('common.cancel')}
          </Button>
        </Grid>
        <Grid xs item className='fe-text-align-end'>
          <FButton type='submit' size='large' fullWidth={false} variant='primary' loading={loading}>
            {t('common.verify')}
          </FButton>
        </Grid>
      </Grid>
    </div>
  );
};
