import React, { FC, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import { RootPathContext } from '@frontegg/react-core';
import { IRootPath } from '../interfaces';
import { IntegrationsTable } from './IntegrationsTable';
import { IntegrationsSlackAuthSuccess } from './IntegrationsSlackAuthSuccess';

export interface IntegrationsContentProps extends IRootPath {
  className?: string;
}

export const IntegrationsContent: FC<IntegrationsContentProps> = ({ className }) => {
  const path = useContext(RootPathContext);

  return (
    <div className={classnames('fe-integrations-context', className)}>
      <Route exact path={`${path}`} component={IntegrationsTable} />
      <Route path={`${path}/success`} component={IntegrationsSlackAuthSuccess} />
    </div>
  );
};
