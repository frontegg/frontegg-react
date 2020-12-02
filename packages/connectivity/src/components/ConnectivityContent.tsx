import React, { FC, useContext } from 'react';
import { Route } from 'react-router-dom';
import classnames from 'classnames';
import { RootPathContext } from '@frontegg/react-core';
import { IRootPath } from '../interfaces';
import { ConnectivityTable } from './ConnectivityTable';
import { ConnectivitySlackAuthSuccess } from './ConnectivitySlackAuthSuccess';

export interface ConnectivityContentProps extends IRootPath {
  className?: string;
}

export const ConnectivityContent: FC<ConnectivityContentProps> = ({ className }) => {
  const path = useContext(RootPathContext);

  return (
    <div className={classnames('fe-connectivity-context', className)}>
      <Route exact path={`${path}`} component={ConnectivityTable} />
      <Route path={`${path}/success`} component={ConnectivitySlackAuthSuccess} />
    </div>
  );
};
