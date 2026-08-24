import React, { FC } from 'react';
import { checkRootPath } from '@frontegg/react-core';
import { SSOSteps } from './SSOSteps';
import { SSONoDataPlaceholder } from './SSONoDataPlaceholder';
import { Route } from 'react-router-dom';

const SSOOverviewPage: FC = (props) => {
  const rootPath = checkRootPath('SSOOverviewPage should be rendered inside SSORouter component');

  const children = props.children ?? (
    <>
      <SSOSteps />
      <SSONoDataPlaceholder />
    </>
  );

  return (
    <Route exact path={`${rootPath}`}>
      {children}
    </Route>
  );
};

export { SSOOverviewPage };
