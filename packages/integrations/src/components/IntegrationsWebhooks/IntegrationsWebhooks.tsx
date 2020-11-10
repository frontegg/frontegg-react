import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { IntegrationsWebhooksEdit } from './IntegrationsWebhooksEdit';
import { IntegrationsWebhooksList } from './IntegrationsWebhooksList';
import { IWebhookLocationState } from './interfaces';

export const IntegrationsWebhooks: FC = () => {
  const {
    replace: historyReplace,
    location: { state: locationState, ...location },
  } = useHistory<IWebhookLocationState>();

  return locationState.view !== 'list' ? <IntegrationsWebhooksEdit /> : <IntegrationsWebhooksList />;
};
