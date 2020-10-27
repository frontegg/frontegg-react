import React, { FC, useEffect } from 'react';
import { Loader, useDispatch, useSelector } from '@frontegg/react-core';
import { IFormComponents, IPluginState } from '../../types';
import { integrationsActions } from '../../reducer';
import { IntegrationsWebhooksForm } from './IntegrationsWebhooksForm';
import { IntegrationsWebhooksList } from './IntegrationsWebhooksList';

export const IntegrationsWebhooks: FC<IFormComponents> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { isLoading, data, isFormData } = useSelector(({ integrations: { list, forms } }: IPluginState) => ({
    ...list,
    isFormData: !!forms.data,
  }));

  useEffect(() => {
    dispatch(integrationsActions.loadListAction());
    return () => {
      dispatch(integrationsActions.cleanListsData());
    };
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader center />
      ) : isFormData ? (
        <IntegrationsWebhooksForm />
      ) : (
        data && <IntegrationsWebhooksList data={data} />
      )}
    </div>
  );
};
