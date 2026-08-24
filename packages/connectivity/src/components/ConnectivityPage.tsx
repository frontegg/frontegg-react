import React, { FC, useEffect } from 'react';
import classnames from 'classnames';
import { ConnectivityContent, ConnectivityContentProps } from './ConnectivityContent';
import { ConnectivityHeader, ConnectivityHeadersProps } from './ConnectivityHeader';
import { RootPathContext } from '@frontegg/react-core';
import { defaultRootPath } from '../consts';
import { useConnectivityActions } from '@frontegg/react-hooks';
export interface IConnectivityPage
  extends Omit<ConnectivityContentProps, 'className'>,
    Omit<ConnectivityHeadersProps, 'className'> {
  className?: string;
  headClassName?: string;
  contentClassName?: string;
}

export const ConnectivityPage: FC<IConnectivityPage> = ({
  children,
  className,
  rootPath = defaultRootPath,
  headClassName,
  titleClassName,
  contentClassName,
  ...contentProps
}) => {
  const { loadDataAction, initData } = useConnectivityActions();
  useEffect(() => {
    loadDataAction();
    return () => {
      initData();
    };
  }, []);

  return (
    <RootPathContext.Provider value={rootPath}>
      <div className={classnames('fe-connectivity-page', className)}>
        {children ?? (
          <>
            <ConnectivityContent className={contentClassName} {...contentProps} />
            <ConnectivityHeader className={headClassName} titleClassName={titleClassName} />
          </>
        )}
      </div>
    </RootPathContext.Provider>
  );
};
