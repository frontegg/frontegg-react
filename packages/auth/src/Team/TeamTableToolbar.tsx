import React, { FC } from 'react';
import { Button, Grid, Icon, Input } from '@frontegg/react-core';

export interface TeamTableToolbarProps {}

export const TeamTableToolbar: FC<TeamTableToolbarProps> = (props) => {
  return (
    <div className='fe-team__table-toolbar'>
      <Grid container spacing={6}>
        <Grid item md={6} xs={12}>
          <Input size='large' placeholder='Start for users...' fullWidth />
        </Grid>
        <Grid item md={6} xs={12}>
          <Button variant='primary'>
            Invite <Icon name='right-arrow' />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
