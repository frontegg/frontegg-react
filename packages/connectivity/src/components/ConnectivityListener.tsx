import React, { FC, useEffect } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { ListenerProps, useDispatch } from '@frontegg/react-core';
import { connectivityActions, storeName } from '../reducer';

export const ConnectivityListener: FC<ListenerProps<typeof connectivityActions>> = (props) => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(connectivityActions, dispatch);

  useEffect(() => {
    actions.initData();
  }, [actions]);

  useEffect(() => {
    props.resolveActions?.(storeName, actions);
  }, [props.resolveActions, actions]);
  return null;
};
