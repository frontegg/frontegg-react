import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { HomePage } from './pages/HomePage';

export const Routes = () => {
  return (
    <Switch>
      <Route path='/' component={HomePage} />
      <Redirect path={'*'} to={'/'} />
    </Switch>
  );
};
