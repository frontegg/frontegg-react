import React, { FC } from 'react';
import { NotificationsItem } from './NotificationsItem';
import { NotificationsWindowFooter } from './NotificationsWindowFooter';
import { NotificationsWindowHeader } from './NotificationsWindowHeader';

const items = [
  { title: 'Api Monitor', description: 'DDOS detected on Policy API' },
  { title: 'Api Monitor', description: 'DDOS detected on Policy API' },
  { title: 'Api Monitor', description: 'DDOS detected on Policy API' },
  { title: 'Api Monitor', description: 'DDOS detected on Policy API' },
  { title: 'Api Monitor', description: 'DDOS detected on Policy API' },
  { title: 'Api Monitor', description: 'DDOS detected on Policy API' },
];

export const NotificationsWindow: FC = () => {
  return (
    <div className='fe-notifications-window'>
      <NotificationsWindowHeader />
      <div className='fe-notifications-window-items-container'>
        {items.map((i) => (
          <NotificationsItem />
        ))}
        <NotificationsWindowFooter />
      </div>
    </div>
  );
};
