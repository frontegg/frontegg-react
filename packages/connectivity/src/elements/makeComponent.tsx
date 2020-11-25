import React, { FC, useEffect, useLayoutEffect } from 'react';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { RootPathContext, useDispatch } from '@frontegg/react-core';
import { IntegrationsContentProps } from '../components/IntegrationsContent';
import { TPlatform } from '../interfaces';
import { platformForm } from '../consts';
import { integrationsActions } from '../reducer';

export interface IMakeComponent {
  type: TPlatform;
  defaultPath: string;
}

export const makeComponent = ({ type, defaultPath }: IMakeComponent): FC<IntegrationsContentProps> => ({
  rootPath = defaultPath,
  className,
}) => {
  const dispatch = useDispatch();
  const {
    replace: historyReplace,
    location: { state, ...location },
  } = useHistory();

  useEffect(() => {
    !state && historyReplace({ ...location, state: {} });
  }, [historyReplace, location, state]);

  useLayoutEffect(() => {
    dispatch(integrationsActions.loadDataAction([type]));
    return () => {
      dispatch(integrationsActions.cleanData());
    };
  }, [dispatch]);

  const Component = platformForm[type];
  return (
    <RootPathContext.Provider value={rootPath}>
      <div className={classnames('fe-integrations-component', className)}>
        <Component />
      </div>
    </RootPathContext.Provider>
  );
};
