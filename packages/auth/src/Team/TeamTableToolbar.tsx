import React from 'react';
import { Button, Grid, Icon, Input } from '@frontegg/react-core';
import { useAuthTeamActions } from '../hooks';

export const TeamTableToolbar = () => {
  const { openAddUserDialog } = useAuthTeamActions();
  return (
    <div className='fe-team__table-toolbar'>
      <Grid container spacing={6}>
        <Grid item md={4} xs={6}>
          <Input size='large' placeholder='Start for users...' fullWidth />
        </Grid>
        <Grid item md={8} xs={6} className='fe-text-align-end'>
          <Button
            variant='primary'
            size='large'
            onClick={() => {
              openAddUserDialog();
            }}
          >
            Invite User <Icon className='fe-ml-1' name='person-add' />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
