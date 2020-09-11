import React, { FC } from 'react';
import { checkRootPath } from '@frontegg/react-core';
import { Route } from 'react-router-dom';
import { HideOption } from '../interfaces';

export const SSOConfigureIDPPage: FC<HideOption> = () => {
  const rootPath = checkRootPath('SSOConfigureIDPPage must be rendered inside a SSORouter component');
  return <Route path={`${rootPath}/idp`}>SSOConfigureIDP</Route>;
};
