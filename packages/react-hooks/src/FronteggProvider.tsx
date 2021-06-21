import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { createFronteggStore } from '@frontegg/redux-store';
import { ContextHolder, ContextOptions } from '@frontegg/rest-api';
import { useAuth, useAuthRoutes } from './auth';
import { FronteggStoreContext } from './FronteggStoreContext';

type FronteggProviderProps = {
  app?: any; // FronteggApp
  contextOptions?: ContextOptions;
  setLoading?: (loading: boolean) => void;
};

const setLoading = (loading: boolean): void => {
  const isSSR = typeof document === 'undefined' || typeof window === 'undefined';

  if (!isSSR) {
    if (loading) {
      document.body.classList.add('frontegg-loading');
    } else {
      document.body.classList.remove('frontegg-loading');
    }
  }
};

const HideChildrenIfFronteggRoutes: FC<{ basename?: string }> = ({ children, basename }) => {
  const routes = useAuthRoutes();
  const uriRef = useRef(window.location.pathname);
  const [uri, setUri] = useState(window.location.pathname);
  useEffect(() => {
    document.addEventListener('frontegg_onRedirectTo_fired', () => {
      if (uriRef.current !== window.location.pathname) {
        uriRef.current = window.location.pathname;
        setUri(document.location.pathname);
      }
    });
    window.addEventListener('popstate', () => {
      if (uriRef.current !== window.location.pathname) {
        uriRef.current = window.location.pathname;
        setUri(document.location.pathname);
      }
    });

    setInterval(() => {
      if (uriRef.current !== window.location.pathname) {
        uriRef.current = window.location.pathname;
        setUri(document.location.pathname);
      }
    }, 50);
  }, [setUri]);

  const calculatedBasename = basename ? (basename.endsWith('/') ? basename.substring(0, basename.length - 1) : '') : '';
  switch (uri) {
    case calculatedBasename + routes.loginUrl:
    case calculatedBasename + routes.logoutUrl:
    case calculatedBasename + routes.activateUrl:
    case calculatedBasename + routes.acceptInvitationUrl:
    case calculatedBasename + routes.forgetPasswordUrl:
    case calculatedBasename + routes.resetPasswordUrl:
    case calculatedBasename + routes.socialLoginCallbackUrl:
    case calculatedBasename + routes.signUpUrl:
      return null;
  }

  return <>{children}</>;
};

const FronteggContent: FC<{ app?: any; setLoading: (loading: boolean) => void }> = ({ children, app, setLoading }) => {
  const { isLoading } = useAuth(({ isLoading }) => ({ isLoading }));
  const customLoginBox: boolean = app ? !!app.options?.customLoginBox : true;
  setLoading(isLoading);
  if (isLoading) {
    return null;
  }
  if (customLoginBox) {
    return <>{children}</>;
  }

  return <HideChildrenIfFronteggRoutes basename={app?.options.basename}>{children}</HideChildrenIfFronteggRoutes>;
};

export const FronteggProvider: FC<FronteggProviderProps> = ({
  children,
  app,
  contextOptions,
  setLoading: setLoadingProps,
}) => {
  const context = app?.options?.contextOptions ?? contextOptions;
  const routes = app?.options?.authRoutes ?? {};
  const previewMode = app?.options?.previewMode ?? false;
  ContextHolder.setContext(context);
  const store = useMemo(() => createFronteggStore({ context }, app, previewMode, { routes }), [app, previewMode]);

  return (
    <Provider context={FronteggStoreContext} store={store}>
      <FronteggContent setLoading={setLoadingProps ?? setLoading} app={app}>
        {children}
      </FronteggContent>
    </Provider>
  );
};
