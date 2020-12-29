import React, { FC, useEffect, useRef } from 'react';
import { useNotificationsActions } from './hooks';

export const NotificationsWrapper: FC = ({ children }) => {
  const { loadMetadata } = useNotificationsActions();
  useEffect(() => {
    console.log('NotificationsWrapper');
    loadMetadata();
  }, []);

  return <>{children}</>;
};
