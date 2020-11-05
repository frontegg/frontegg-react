import { Button } from '@frontegg/react-core';
import React, { FC } from 'react';

export interface NotificationsBellProps {
  onClick?: () => void;
}

export const NotificationsBell: FC<NotificationsBellProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick} iconButton className='fe-notifications-bell'>
      Bell
    </Button>
  );
};
