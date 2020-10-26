import React, { FC, useEffect } from 'react';
import { Loader, useDispatch, useSelector } from '@frontegg/react-core';
import { integrationsActions } from '../../reducer';
import { IPluginState } from '../../types';

export const IntegrationsSlack: FC = () => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector(({ integrations, ...state }: IPluginState) => {
    return { isLoading: integrations?.forms.isLoading };
  });

  useEffect(() => {
    dispatch(integrationsActions.loadFormAction('slack'));
    return () => {
      dispatch(integrationsActions.cleanFormsData());
    };
  }, []);

  return <div>{isLoading ? <Loader center /> : 'Slack'}</div>;
};
