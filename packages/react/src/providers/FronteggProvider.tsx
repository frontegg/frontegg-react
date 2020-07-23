import React from 'react';
import { UILibrary, UILibraryProvider } from './UILibraryProvider';
import { ContextOptions, ContextProvider } from './context';
import { StateProvider, FronteggPluginTypes } from './StateProvider';


export interface IFronteggProvider {
  contextOptions: ContextOptions;
  plugins: FronteggPluginTypes[];
  uiLibrary: UILibrary;
}

export class FronteggProvider extends React.Component<IFronteggProvider> {
  static defaultProps = {
    plugins: [],
    uiLibrary: 'semantic',
    routes: {},
  };

  render() {
    const { children, plugins, uiLibrary, contextOptions } = this.props;
    return <UILibraryProvider value={uiLibrary || 'semantic'}>
      <ContextProvider value={contextOptions}>
        <StateProvider plugins={plugins}>
          {children}
        </StateProvider>
      </ContextProvider>
    </UILibraryProvider>;
  }
}
