import { Loader, RootPathContext } from '@frontegg/react-core';
import React, { FC, useContext, useLayoutEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useConnectivityState, useConnectivityActions } from '@frontegg/react-hooks';

export const ConnectivitySlackAuthSuccess: FC = () => {
  const { postCodeAction } = useConnectivityActions();

  const path = useContext(RootPathContext);
  const { search } = useLocation();
  const { isSaving } = useConnectivityState();

  useLayoutEffect(() => {
    if (search) {
      const query = new URLSearchParams(search);
      if (query.has('code')) {
        postCodeAction(query.get('code') || '');
      }
    }
  }, [search]);

  if (isSaving) {
    return <Loader center />;
  }
  return <Redirect to={{ pathname: path || '/', state: { open: 'slack' } }} />;
};
