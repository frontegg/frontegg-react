import React, { ComponentType } from 'react';
import { ContextOptions, fronteggElements, FronteggProvider, PluginConfig } from '@frontegg/react-core';
import { AuthPlugin } from '@frontegg/react-auth';

import { uiLibrary as SemanticLibrary } from '@frontegg/react-elements-semantic';
import { uiLibrary as MaterialLibrary } from '@frontegg/react-elements-material-ui';

const developmentHosts = ['localhost', 'local.frontegg.com'];
const host =
  developmentHosts.indexOf(window.location.hostname) !== -1
    ? `${window.location.hostname}:8080`
    : window.location.hostname;

const contextOptions: ContextOptions = {
  baseUrl: `${window.location.protocol}//${host}`,
  requestCredentials: 'include',
};

const plugins: PluginConfig[] = [AuthPlugin({})];

export const withFrontegg = (Component: ComponentType<any>) => () => (
  <FronteggProvider
    debugMode
    context={contextOptions}
    plugins={plugins}
    uiLibrary={{
      // ...MaterialLibrary,
      // Input: SemanticLibrary.Input,
      // Dialog: SemanticLibrary.Dialog,
      // Form: SemanticLibrary.Form,
      // Select: SemanticLibrary.Select,
      // ...(localStorage.getItem('library') === 'material' ? MaterialLibrary : SemanticLibrary),
      // Tag: fronteggElements.Tag
      // Input: SemanticLibrary.Input,
      // Form: SemanticLibrary.Form,
      // Dialog: MaterialLibrary.Dialog,
      // Loader: fronteggElements.Loader,
      // Button: fronteggElements.Button,
      ...MaterialLibrary,
    }}
  >
    <Component />
  </FronteggProvider>
);
