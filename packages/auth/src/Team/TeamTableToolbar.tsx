import React from 'react';
import { Button, Grid, Icon, Input, useT } from '@frontegg/react-core';
import { useAuthTeamActions } from '../hooks';

export const TeamTableToolbar = () => {
  const { openAddUserDialog, loadUsers } = useAuthTeamActions();
  const { t } = useT();
  return (
    <div className='fe-team__table-toolbar'>
      <Grid container spacing={2}>
        <Grid item md={4} xs={6}>
          <Input size='small' label={t('auth.team.search-users')} fullWidth />
        </Grid>
        <Grid item md={8} xs={6} className='fe-text-align-end'>
          <Button variant='primary' size='large' onClick={() => openAddUserDialog()}>
            {t('auth.team.invite-user')} <Icon className='fe-ml-1' name='person-add' />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
