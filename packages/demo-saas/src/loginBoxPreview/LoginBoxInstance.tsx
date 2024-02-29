import { createFronteggStore, EnhancedStore } from '@frontegg/redux-store';
import ReactDOM from 'react-dom';
import { LoginBoxRenderer } from '@frontegg/js';
import { initialStore } from './initialStore';

class LoginBoxInstance {
  listeners: ((loading: boolean, instance: LoginBoxInstance) => void)[] = [];
  loaded: boolean;
  store: EnhancedStore;
  renderer: LoginBoxRenderer;

  constructor() {
    this.store = createFronteggStore(
      {
        context: { baseUrl: 'preview' },
        appName: 'builder',
      },
      this,
      true,
      undefined,
      undefined,
      true
    );
    this.renderer = new LoginBoxRenderer('builder', {}, this.store, { builderMode: true });
    this.loaded = false;
  }

  render(loginBoxContainer?: HTMLElement) {
    if (!loginBoxContainer) {
      return;
    }
    try {
      ReactDOM.unmountComponentAtNode(loginBoxContainer);
    } catch (e) {
      console.log(e);
    }
    this.renderer.render(loginBoxContainer);
    this.renderer.setStore(initialStore);
  }

  addListener(listener: (loading: boolean, instance: LoginBoxInstance) => void) {
    this.listeners.push(listener);
    if (this.loaded) {
      listener(true, this);
    }
  }

  removeListener(listener: (loading: boolean, instance: LoginBoxInstance) => void) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  setLoaded() {
    this.listeners.forEach((listener) => listener(true, this));
  }
}

export default new LoginBoxInstance();
