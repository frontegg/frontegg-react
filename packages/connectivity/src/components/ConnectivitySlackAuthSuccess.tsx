import { Loader, RootPathContext, useSelector } from '@frontegg/react-core';
// import { useConnectivityActions } from '@frontegg/react-hooks';
import React, { FC, useContext, useLayoutEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
// import { IPluginState } from '../interfaces';
// import { connectivityActions } from '../reducer';
import { useConnectivityState, useConnectivityActions } from '@frontegg/react-hooks';

export const ConnectivitySlackAuthSuccess: FC = () => {
  // const dispatch = useDispatch();
  const { postCodeAction } = useConnectivityActions();

  const path = useContext(RootPathContext);
  const { search } = useLocation();
  // const { isSaving } = useSelector(({ connectivity: { isSaving } }: IPluginState) => ({ isSaving }));
  const { isSaving } = useConnectivityState();

  useLayoutEffect(() => {
    if (search) {
      const query = new URLSearchParams(search);
      if (query.has('code')) {
        // dispatch(connectivityActions.postCodeAction(query.get('code') || ''));
        postCodeAction(query.get('code') || '');
      }
    }
  }, [search]);

  if (isSaving) {
    return <Loader center />;
  }
  return <Redirect to={{ pathname: path || '/', state: { open: 'slack' } }} />;
};
