import React, { FC, useContext } from 'react';
import { Route } from 'react-router-dom';
import classnames from 'classnames';
import { RootPathContext } from '@frontegg/react-core';
import { IRootPath } from '../interfaces';
import { IntegrationsTable } from './IntegrationsTable';

export interface IntegrationsContentProps extends IRootPath {
  className?: string;
}

export const IntegrationsContent: FC<IntegrationsContentProps> = ({ className }) => {
  const path = useContext(RootPathContext);

  return (
    <div className={classnames('fe-integrations-context', className)}>
      <Route exact path={`${path}`} component={IntegrationsTable} />
      <Route path={`${path}/email`}>
        <div>Email</div>
      </Route>
      <Route path={`${path}/sma`}>
        <div>SMS</div>
      </Route>
    </div>
  );
};
