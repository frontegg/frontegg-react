import React, { FC, useMemo } from 'react';
import { Provider } from 'react-redux';
import { createFronteggStore } from '@frontegg/redux-store';
import { ContextHolder } from '@frontegg/rest-api';

export const FronteggProvider: FC = ({ children }) => {
  const context = ContextHolder.getContext();
  const store = useMemo(() => createFronteggStore({ context }), []);

  return <Provider store={store}>
    {children}
  </Provider>;
};
