import React, { FC } from 'react';
import { Grid, Button, Icon, Popup } from '@frontegg/react-core';
import { NotificationsItemOptions } from './NotificationsItemOptions';

export const NotificationsItem: FC = () => {
  return (
    <Grid className='fe-notifications-item' container direction='row'>
      <div className='fe-notifications-item__icon'>Icon</div>
      <div className='fe-notifications-item__main'>
        <div className='fe-notifications-item__title'>Api Monitor</div>
        <div className='fe-notifications-item__desc'>DDOS detected on Policy API</div>
        <div className='fe-notifications-item__time'>1h ago</div>
      </div>
      <span className='fe-notifications-item__options-icon'>
        <Popup
          action='click'
          position={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          trigger={
            <Button iconButton>
              <Icon name='vertical-dots' size='small' />{' '}
            </Button>
          }
          content={<NotificationsItemOptions />}
        />
      </span>
    </Grid>
  );
};
