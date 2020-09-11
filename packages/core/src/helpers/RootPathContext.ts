import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router';

export const RootPathContext = React.createContext<string | null>(null);

export const useRootPath = (props: any, defaultRoute: string = '/'): [string, boolean] => {
  const rootPathFromContext = useContext(RootPathContext);
  const routeMatch = useRouteMatch();
  const rootPath = rootPathFromContext ?? props.rootPath ?? routeMatch?.url ?? defaultRoute;
  const isRootPathContext = rootPathFromContext != null;

  return [rootPath, isRootPathContext];
};

export const checkRootPath = (error: string): string => {
  const path = useContext(RootPathContext);
  if (path != null) {
    return path;
  }
  throw Error(error);
};
