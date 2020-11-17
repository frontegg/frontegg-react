import { PluginConfig } from '@frontegg/react-core';
import { initialState, reducer, storeName } from './reducer';
import { sagas } from './saga';
import { makeComponent } from './elements/makeComponent';
import './index.scss';

export * from './components/IntegrationsPage';
export * from './components/IntegrationsHeader';

export const WebhookComponent = makeComponent({ type: 'webhook', defaultPath: '/webhook' });
export const SlackComponent = makeComponent({ type: 'slack', defaultPath: '/slack' });
export const EmailComponent = makeComponent({ type: 'email', defaultPath: '/emails' });

export const IntegrationsPlugin = (): PluginConfig => ({
  storeName,
  reducer,
  sagas,
  preloadedState: {
    ...initialState,
  },
});
