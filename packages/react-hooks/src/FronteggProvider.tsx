import React, { FC, useMemo } from 'react';
import { Provider } from 'react-redux';
import { createFronteggStore } from '@frontegg/redux-store';
import { ContextHolder, ContextOptions } from '@frontegg/rest-api';
import { useAuth } from './auth';

type FronteggProviderProps = {
  app?: any; // FronteggApp
  contextOptions?: ContextOptions;
  setLoading?: (loading: boolean) => void;
};

const setLoading = (loading: boolean): void => {
  const isSSR = typeof window === 'undefined';

  if (!isSSR) {
    if (loading) {
      document.body.classList.add('frontegg-loading');
    } else {
      document.body.classList.remove('frontegg-loading');
    }
  }
};
const FronteggContent: FC<{ setLoading: (loading: boolean) => void }> = ({ children, setLoading }) => {
  const { isLoading } = useAuth(({ isLoading }) => ({ isLoading }));
  setLoading(isLoading);
  if (isLoading) {
    return null;
  }
  return <>{children}</>;
};
export const FronteggProvider: FC<FronteggProviderProps> = ({
  children,
  app,
  contextOptions,
  setLoading: setLoadingProps,
}) => {
  const context = contextOptions ?? app.options.contextOptions;
  ContextHolder.setContext(context);
  const store = useMemo(() => createFronteggStore({ context }, app), [app]);

  return (
    <Provider store={store}>
      <FronteggContent setLoading={setLoadingProps ?? setLoading}>{children}</FronteggContent>
    </Provider>
  );
};
