import React from 'react';

export type UILibrary = 'semantic'

const { Provider, Consumer } = React.createContext<UILibrary>('semantic');

export {
  Provider as UILibraryProvider,
  Consumer as UILibraryConsumer,
};
