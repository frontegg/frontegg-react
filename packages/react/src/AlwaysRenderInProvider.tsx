import React, { FC } from 'react';
import { useAuthRoutes, CustomComponentRegister } from '@frontegg/react-hooks';
import { useQueryKeeper } from './queryKeeper';
import { FronteggApp } from '@frontegg/js';
import { FronteggThemeOptions } from '@frontegg/types';

export type HistoryObject = {
  push: (path: string) => void;
  replace: (path: string) => void;
};

type QueryKeeperWrapperProps = {
  history: HistoryObject;
};

export const QueryKeeperWrapper: FC<QueryKeeperWrapperProps> = ({ history }) => {
  const { signUpUrl } = useAuthRoutes();
  useQueryKeeper({ routes: { signUpUrl }, history });
  return <></>;
};

type AlwaysRenderInProviderProps = {
  isExternalHistory: boolean;
  app: FronteggApp;
  themeOptions?: FronteggThemeOptions;
  history: HistoryObject;
};

export const AlwaysRenderInProvider = ({
  isExternalHistory,
  app,
  themeOptions,
  history,
}: AlwaysRenderInProviderProps) => {
  return (
    <>
      <CustomComponentRegister app={app} themeOptions={themeOptions} />
      {!isExternalHistory && <QueryKeeperWrapper history={history} />}
    </>
  );
};
