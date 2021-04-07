import React, { FC } from 'react';

const options = ['Pin to top', 'Mark as unread', 'Dismiss'];

export const NotificationsItemOptions: FC = () => {
  return (
    <div className='fe-notifications-item-options'>
      {options.map((i) => (
        <div className='fe-notifications-item-options__option'>{i}</div>
      ))}
    </div>
  );
};
