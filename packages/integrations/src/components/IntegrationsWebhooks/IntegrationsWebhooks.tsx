import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { IntegrationsWebhooksEdit } from './IntegrationsWebhooksEdit';
import { IntegrationsWebhooksList } from './IntegrationsWebhooksList';
import { IWebhookLocationState } from './interfaces';

export const IntegrationsWebhooks: FC = () => {
  const {
    location: { state: locationState },
  } = useHistory<IWebhookLocationState>();

  return !locationState.view || locationState.view === 'list' ? (
    <IntegrationsWebhooksList />
  ) : (
    <IntegrationsWebhooksEdit />
  );
};
