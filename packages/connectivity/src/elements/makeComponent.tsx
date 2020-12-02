import React, { FC, useEffect, useLayoutEffect } from 'react';
import classnames from 'classnames';
import { useHistory, Route } from 'react-router-dom';
import { RootPathContext, useDispatch } from '@frontegg/react-core';
import { ConnectivityContentProps } from '../components/ConnectivityContent';
import { TPlatform } from '../interfaces';
import { platformForm } from '../consts';
import { connectivityActions } from '../reducer';

export interface IMakeComponent {
  type: TPlatform;
  defaultPath: string;
}

export const makeComponent = ({ type, defaultPath }: IMakeComponent): FC<ConnectivityContentProps> => ({
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
    dispatch(connectivityActions.loadDataAction([type]));
    return () => {
      dispatch(connectivityActions.cleanData());
    };
  }, [dispatch]);

  const Component = platformForm[type];
  return (
    <RootPathContext.Provider value={rootPath}>
      <div className={classnames('fe-connectivity-component', className)}>
        <Route exact path={`${rootPath}`} component={Component} />
      </div>
    </RootPathContext.Provider>
  );
};
