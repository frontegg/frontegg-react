import React, { FC } from 'react';
import { Button, FButton, Grid, useDialog, useT } from '@frontegg/react-core';
import { useAuthMfaState } from '../hooks';

export const MFADisableDialogFooter: FC = (props) => {
  const { t } = useT();
  const { loading } = useAuthMfaState(({ loading }) => ({ loading }));
  const { onClose } = useDialog();
  return (
    <div className='fe-dialog__footer'>
      <Grid container>
        <Grid xs item>
          <Button isCancel onClick={onClose}>
            {t('common.cancel')}
          </Button>
        </Grid>
        <Grid xs item className='fe-text-align-end'>
          <FButton type='submit' fullWidth={false} variant='danger' loading={loading}>
            {t('common.disable')}
          </FButton>
        </Grid>
      </Grid>
    </div>
  );
};
