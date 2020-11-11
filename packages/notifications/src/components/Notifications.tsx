import React, { FC, useState, useCallback } from 'react';
import { NotificationsWrapper } from '../WrapperComponent';
import { NotificationsBell } from './NotificationsBell';
import { NotificationsWindow } from './NotificationsWindow';
import { Popup } from '@frontegg/react-core';

export const Notifications: FC = (props) => {
  const [windowOpened, setWindowOpened] = useState(true);

  const onClickBell = useCallback(() => {
    setWindowOpened(!windowOpened);
  }, [windowOpened]);

  return (
    <>
      <Popup action='click' trigger={<NotificationsBell />} content={<NotificationsWindow />} />
      {/* {windowOpened && } */}
    </>
  );
};
