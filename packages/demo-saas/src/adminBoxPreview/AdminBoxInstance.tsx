import { createFronteggStore, EnhancedStore } from '@frontegg/redux-store';
import { AdminPortalRenderer } from '@frontegg/js';
import ReactDOM from 'react-dom';

class AdminBoxInstance {
  listeners: ((loading: boolean, instance: AdminBoxInstance) => void)[] = [];
  loaded: boolean;
  store: EnhancedStore;
  renderer: AdminPortalRenderer;

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
    this.renderer = new AdminPortalRenderer('builder', {}, this.store, { builderMode: true });
    this.renderer.app.loadFeatureFlags();
    this.renderer.app.setFeatureFlagsForPreview({
      'security-center-admin-portal': 'on',
    });
    this.loaded = false;
  }

  render(adminBoxContainer?: HTMLElement) {
    if (!adminBoxContainer) {
      return;
    }
    try {
      ReactDOM.unmountComponentAtNode(adminBoxContainer);
    } catch (e) {
      console.log(e);
    }
    this.renderer.render(adminBoxContainer);
  }

  addListener(listener: (loading: boolean, instance: AdminBoxInstance) => void) {
    this.listeners.push(listener);
    if (this.loaded) {
      listener(true, this);
    }
  }

  removeListener(listener: (loading: boolean, instance: AdminBoxInstance) => void) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  setLoaded() {
    this.listeners.forEach((listener) => listener(true, this));
  }
}

export default new AdminBoxInstance();
