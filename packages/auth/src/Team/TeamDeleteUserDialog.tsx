import React, { FC, useCallback } from 'react';
import { Button, Dialog, ErrorMessage, FButton, Grid, useT } from '@frontegg/react-core';
import { useAuthTeamActions, useAuthTeamState } from './hooks';
import { useAuthUserOrNull } from '../hooks';

export interface TeamDeleteUserDialogProps {
  open?: boolean;
}

export const TeamDeleteUserDialog: FC<TeamDeleteUserDialogProps> = (props) => {
  const { t } = useT();
  const user = useAuthUserOrNull();
  const { open, error, loading, userId, email } = useAuthTeamState(
    ({ deleteUserDialogState }) => deleteUserDialogState
  );
  const { deleteUser, closeDeleteUserDialog } = useAuthTeamActions();
  const isMe = user?.id === userId;

  const handleDeleteUser = useCallback(() => {
    userId && deleteUser({ userId });
  }, [deleteUser, userId]);

  const isOpen = !!userId && open;

  return (
    <Dialog open={isOpen} size={'tiny'} header={t('auth.team.deleteDialog.title')}>
      <p>{t('auth.team.deleteDialog.message', { email: isMe ? t('common.yourself') : email })}</p>
      <ErrorMessage error={error} />

      <div className='fe-dialog__footer'>
        <Grid container>
          <Grid xs item>
            <Button size='large' isCancel fullWidth={false} disabled={loading} onClick={() => closeDeleteUserDialog()}>
              {t('common.cancel')}
              data-test-id="deleteCancel-btn"
            </Button>
          </Grid>
          <Grid xs item className='fe-text-align-end'>
            <Button size='large' fullWidth={false} variant='danger' loading={loading} onClick={handleDeleteUser}>
              {isMe ? t('auth.team.leaveTeam') : t('common.delete')}
              data-test-id="delete-btn"
            </Button>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
};
