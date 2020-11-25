import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ConnectivityWebhooksEdit } from './ConnectivityWebhooksEdit';
import { ConnectivityWebhooksList } from './ConnectivityWebhooksList';
import { IWebhookLocationState } from './interfaces';

export const ConnectivityWebhooks: FC = () => {
  const {
    location: { state: locationState },
  } = useHistory<IWebhookLocationState>();

  return !locationState?.view || locationState.view === 'list' ? (
    <ConnectivityWebhooksList />
  ) : (
    <ConnectivityWebhooksEdit />
  );
};
