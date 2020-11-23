import { Loader, RootPathContext, useDispatch, useSelector } from '@frontegg/react-core';
import React, { FC, useContext, useLayoutEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { IPluginState } from '../interfaces';
import { integrationsActions } from '../reducer';

export const IntegrationsSlackAuthSuccess: FC = () => {
  const dispatch = useDispatch();
  const path = useContext(RootPathContext);
  const { search } = useLocation();
  const { isSaving } = useSelector(({ integrations: { isSaving } }: IPluginState) => ({ isSaving }));

  useLayoutEffect(() => {
    if (search) {
      const query = new URLSearchParams(search);
      if (query.has('code')) {
        dispatch(integrationsActions.postCodeAction(query.get('code') || ''));
      }
    }
  }, [search]);

  if (isSaving) {
    return <Loader center />;
  }
  return <Redirect to={{ pathname: path || '/', state: { open: 'slack' } }} />;
};
