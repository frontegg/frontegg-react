import React, { FC } from 'react';
import { Grid, Tag } from '@frontegg/react-core';

export const NotificationsWindowHeader: FC = () => {
  return (
    <>
      <Grid className='fe-notifications-window-header' container>
        <div className='fe-notifications-window-header__title'>Notifications</div>
        <Tag className='fe-notifications-window-header__counter' variant='primary' size='small'>
          3
        </Tag>
      </Grid>
      <hr className='fe-notifications-window-header__border' />
    </>
  );
};
