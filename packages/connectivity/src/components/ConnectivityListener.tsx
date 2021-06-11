import React, { FC, useEffect } from 'react';
import { ListenerProps } from '@frontegg/react-core';
import connectivity from '@frontegg/redux-store/connectivity';
import { useConnectivityActions } from '@frontegg/react-hooks';

export const ConnectivityListener: FC<ListenerProps<typeof connectivity.actions>> = (props) => {
  const { initData } = useConnectivityActions();
  const { storeName, actions } = connectivity;
  useEffect(() => {
    initData();
  }, [initData]);

  useEffect(() => {
    props.resolveActions?.(storeName, actions);
  }, [props.resolveActions, actions, storeName]);
  return null;
};
