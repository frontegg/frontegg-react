import React, { FC, useCallback } from 'react';
import { Button, Dialog, ErrorMessage, Grid, useT } from '@frontegg/react-core';
import { useApiTokensState, useApiTokensActions } from '../hooks';
import { ApiStateKeys } from '../../Api/ApiTokensState/interfaces';

export const ApiTokensDeleteDialog: FC = () => {
  const { t } = useT();
  const {
    open,
    clientId,
    apiTokenType,
    loading,
    error,
  } = useApiTokensState(
    ({
      deleteTokenDialog,
      apiTokenType,
      loaders: { DELETE_API_TOKEN: loading },
      errors: { DELETE_API_TOKEN: error },
    }) => ({ ...deleteTokenDialog, apiTokenType, loading, error })
  );
  const { deleteTenantApiToken, deleteUserApiToken, setApiTokensState, setApiTokensError } = useApiTokensActions();

  const handleDeleteUser = useCallback(() => {
    clientId && apiTokenType === 'user' ? deleteUserApiToken(clientId) : deleteTenantApiToken(clientId);
  }, [deleteTenantApiToken, clientId]);

  const handleOnClose = useCallback(() => {
    setApiTokensState({ deleteTokenDialog: { open: false, clientId } });
    setApiTokensError({ key: ApiStateKeys.DELETE_API_TOKEN, value: false });
  }, [clientId, setApiTokensState]);

  const isOpen = !!clientId && open;

  return (
    <Dialog open={isOpen} size={'tiny'} onClose={handleOnClose} header={t('auth.apiTokens.deleteModal.title')}>
      <p className='fe-text-align-center'>{t('auth.apiTokens.deleteModal.message')}</p>

      <ErrorMessage error={error} />
      <div className='fe-dialog__footer'>
        <Grid container>
          <Grid xs item>
            <Button size='large' isCancel fullWidth={false} disabled={!!loading} onClick={handleOnClose}>
              {t('common.cancel')}
            </Button>
          </Grid>
          <Grid xs item className='fe-text-align-end'>
            <Button size='large' fullWidth={false} variant='danger' loading={!!loading} onClick={handleDeleteUser}>
              {t('common.delete')}
            </Button>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
};
