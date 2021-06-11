import { PluginConfig } from '@frontegg/react-core';
// import { initialState, storeName } from './reducer';
// import { sagas } from './saga';
import { makeComponent } from './elements/makeComponent';
import './index.scss';
import { ConnectivityListener } from './components/ConnectivityListener';
import connectivity from '@frontegg/redux-store/connectivity';
export * from './components/ConnectivityPage';
export * from './components/ConnectivityHeader';
export * from './components/ConnectivityContent';

export const WebhookComponent = makeComponent({ type: 'webhook', defaultPath: '/webhook' });
export const SlackComponent = makeComponent({ type: 'slack', defaultPath: '/slack' });
export const EmailComponent = makeComponent({ type: 'email', defaultPath: '/emails' });
export const SMSComponent = makeComponent({ type: 'sms', defaultPath: '/sms' });

export const ConnectivityPlugin = (): PluginConfig => ({
  storeName: connectivity.storeName,
  reducer: connectivity.reducer,
  sagas: connectivity.sagas,
  preloadedState: {
    ...connectivity.initialState,
  },
  Listener: ConnectivityListener,
});
