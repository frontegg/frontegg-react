import React, { FC } from 'react';
import { checkRootPath } from '@frontegg/react-core';
import { SSOSteps } from './SSOSteps';
import { SSONoDataPlaceholder } from './SSONoDataPlaceholder';
import { SSOToggle } from '../SSOToggle';
import { Route } from 'react-router-dom';

type SSOOverviewPageSubComponents = {
  Toggle: typeof SSOToggle;
  Steps: typeof SSOSteps;
  NoDataPlaceholder: typeof SSONoDataPlaceholder;
};

const SSOOverviewPage: FC & SSOOverviewPageSubComponents = (props) => {
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

SSOOverviewPage.Toggle = SSOToggle;
SSOOverviewPage.Steps = SSOSteps;
SSOOverviewPage.NoDataPlaceholder = SSONoDataPlaceholder;

export { SSOOverviewPage };
