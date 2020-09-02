import React from 'react';
import { ComponentsTypesWithProps, RendererFunction } from '@frontegg/react-core';
import { AuthState } from '../Api';
import { Route, Switch } from 'react-router-dom';
import { withAuth } from '../HOCs';


const stateMapper = ({}: AuthState) => ({});

type Components = {}

export interface SSOProps {
  components?: ComponentsTypesWithProps<Components>;
  renderer?: RendererFunction<Props, SSOProps>;
  rootPath?: string; // default: /sso
}

type Props = ReturnType<typeof stateMapper> & SSOProps

class SSOComponent extends React.Component<Props> {
  render() {
    const { rootPath = '/sso' } = this.props;
    return <Switch>
      <Route path={`${rootPath}`}/>
    </Switch>;
  }
}

export const SSO = withAuth(SSOComponent, stateMapper);
