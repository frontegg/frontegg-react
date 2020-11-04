import React, { FC } from 'react';
import { Button, FButton, Grid, useDialog, useT } from '@frontegg/react-core';
import { useAuthMfaState } from '../hooks';

export const MFAVerifyStepFooter: FC = (props) => {
  const { loading } = useAuthMfaState(({ loading }) => ({ loading }));
  const { onClose } = useDialog();
  const { t } = useT();
  return (
    <div className='fe-dialog__footer'>
      <Grid container>
        <Grid xs item>
          <Button className='fe-mr-2' isCancel onClick={onClose}>
            {t('common.cancel')}
          </Button>
        </Grid>
        <Grid xs item className='fe-text-align-end'>
          <FButton type='submit' fullWidth={false} variant='primary' loading={loading}>
            {t('common.verify')}
          </FButton>
        </Grid>
      </Grid>
    </div>
  );
};
