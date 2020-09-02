import React from 'react';
import { ComponentsTypesWithProps, RendererFunction, FronteggClass, omitProps } from '@frontegg/react-core';
import { AuthState } from '../Api';
import { Route, Switch } from 'react-router-dom';
import { withAuth } from '../HOCs';
import { SSOOverview, SSOOverviewProps } from './SSOOverview';
import { SSOClaimDomain, SSOClaimDomainProps } from './SSOClaimDomain';
import { SSOConfigureIDP, SSOConfigureIDPProps } from './SSOConfigureIDP';

const stateMapper = ({}: AuthState) => ({});

type Components = {
  SSOOverview: SSOOverviewProps;
  SSOClaimDomain: SSOClaimDomainProps;
  SSOConfigureIDP: SSOConfigureIDPProps;
}

export interface SSOProps {
  components?: ComponentsTypesWithProps<Components>;
  renderer?: RendererFunction<Props, Components>;
  rootPath?: string; // default: /sso
}

type Props = ReturnType<typeof stateMapper> & SSOProps

class SSOComponent extends FronteggClass<Components, Props> {
  constructor(props: Props) {
    super(props, { SSOOverview, SSOClaimDomain, SSOConfigureIDP });
  }

  render() {
    const { renderer, rootPath = '/sso' } = this.props;
    const { SSOOverview, SSOClaimDomain, SSOConfigureIDP } = this.comps;
    if (renderer) {
      return renderer(omitProps(this.props, ['renderer', 'components']), this.comps);
    }
    return <Switch>
      <Route exact path={rootPath} component={SSOOverview}/>
      <Route exact path={`${rootPath}/domain`} component={SSOClaimDomain}/>
      <Route exact path={`${rootPath}/idp`} component={SSOConfigureIDP}/>
    </Switch>;
  }
}

export const SSO = withAuth(SSOComponent, stateMapper);
