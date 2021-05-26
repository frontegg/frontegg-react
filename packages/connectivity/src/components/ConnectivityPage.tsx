import React, { FC, useEffect } from 'react';
import classnames from 'classnames';
import { ConnectivityContent, ConnectivityContentProps } from './ConnectivityContent';
import { ConnectivityHeader, ConnectivityHeadersProps } from './ConnectivityHeader';
import { RootPathContext, useDispatch } from '@frontegg/react-core';
import { defaultRootPath } from '../consts';
import { connectivityActions } from '../reducer';

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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(connectivityActions.loadDataAction());
    return () => {
      dispatch(connectivityActions.cleanData());
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
