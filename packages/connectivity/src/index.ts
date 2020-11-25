import { PluginConfig } from '@frontegg/react-core';
import { initialState, reducer, storeName } from './reducer';
import { sagas } from './saga';
import { makeComponent } from './elements/makeComponent';
import './index.scss';

export * from './components/ConnectivityPage';
export * from './components/ConnectivityHeader';

export const WebhookComponent = makeComponent({ type: 'webhook', defaultPath: '/webhook' });
export const SlackComponent = makeComponent({ type: 'slack', defaultPath: '/slack' });
export const EmailComponent = makeComponent({ type: 'email', defaultPath: '/emails' });
export const SMSComponent = makeComponent({ type: 'sms', defaultPath: '/sms' });

export const ConnectivityPlugin = (): PluginConfig => ({
  storeName,
  reducer,
  sagas,
  preloadedState: {
    ...initialState,
  },
});
