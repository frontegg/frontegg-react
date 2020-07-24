import React from 'react';
import { UILibrary, UILibraryProvider } from './UILibraryProvider';
import { ContextOptions } from './context';
import { FronteggPluginTypes } from './StateProvider';
import { initialState, reducer, rootSaga } from './StateProvider/saga';
import { CommonProvider } from './CommonProvider';
import ContextRefresher from './ContextRefresher';


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
      <CommonProvider reducer={reducer} initialState={{ ...initialState, contextOptions }} rootSaga={rootSaga}>
        <ContextRefresher context={contextOptions} plugins={plugins}/>
        {children}
      </CommonProvider>
    </UILibraryProvider>;
  }
}
