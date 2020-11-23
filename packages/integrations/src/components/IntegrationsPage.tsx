import React, { FC, useEffect } from 'react';
import classnames from 'classnames';
import { IntegrationsContent, IntegrationsContentProps } from './IntegrationsContent';
import { IntegrationsHeader, IntegrationsHeadersProps } from './IntegrationsHeader';
import { RootPathContext, useDispatch, useRootPath } from '@frontegg/react-core';
import { defaultRootPath } from '../consts';
import { integrationsActions } from '../reducer';

export interface IIntegrationsPage
  extends Omit<IntegrationsContentProps, 'className'>,
    Omit<IntegrationsHeadersProps, 'className'> {
  className?: string;
  headClassName?: string;
  contentClassName?: string;
}

export const IntegrationsPage: FC<IIntegrationsPage> = ({
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
    dispatch(integrationsActions.loadDataAction());
    return () => {
      dispatch(integrationsActions.cleanData());
    };
  }, []);

  return (
    <RootPathContext.Provider value={rootPath}>
      <div className={classnames('fe-integrations-page', className)}>
        {children ?? (
          <>
            <IntegrationsHeader className={headClassName} titleClassName={titleClassName} />
            <IntegrationsContent className={contentClassName} {...contentProps} />
          </>
        )}
      </div>
    </RootPathContext.Provider>
  );
};
