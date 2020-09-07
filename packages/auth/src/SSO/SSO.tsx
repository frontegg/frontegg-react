import React, { FC, ReactElement, useEffect } from 'react';
import { ComponentsTypesWithProps, omitProps, useDynamicComponents, RootPathContext } from '@frontegg/react-core';
import { Route, Switch } from 'react-router-dom';
import { SSOOverview, SSOOverviewProps } from './SSOOverview';
import { SSOClaimDomain, SSOClaimDomainProps } from './SSOClaimDomain';
import { SSOConfigureIDP, SSOConfigureIDPProps } from './SSOConfigureIDP';
import { RendererFunction, useRootPath } from '@frontegg/react-core';
import { useAuth } from '../hooks';
import { Loader } from '@frontegg/react-core';

type Components = {
  SSOOverview: SSOOverviewProps;
  SSOClaimDomain: SSOClaimDomainProps;
  SSOConfigureIDP: SSOConfigureIDPProps;
};

export interface SSOProps {
  components?: ComponentsTypesWithProps<Components>;
  renderer?: RendererFunction<SSOProps, Components, ReactElement>;
  rootPath?: string; // default: /ssc
}

const defaultComponents = { SSOOverview, SSOClaimDomain, SSOConfigureIDP };

export const SSO: FC<SSOProps> = (props) => {
  const Dynamic = useDynamicComponents(defaultComponents, props);
  const { loading, loadSSOConfigurations } = useAuth((state) => ({ loading: state.ssoState.loading }));
  const [rootPath, isRootPathContext] = useRootPath(props, '/sso');

  useEffect(() => {
    loadSSOConfigurations();
  }, []);

  const { renderer } = props;
  if (renderer) {
    return renderer(omitProps(props, ['renderer', 'components']), Dynamic);
  }

  const components = loading ? (
    <Loader inline={false} />
  ) : (
    <Switch>
      <Route exact path={`${rootPath}`} component={SSOOverview} />
      <Route exact path={`${rootPath}/domain`} component={SSOClaimDomain} />
      <Route exact path={`${rootPath}/idp`} component={SSOConfigureIDP} />
    </Switch>
  );

  if (!isRootPathContext) {
    return <RootPathContext.Provider value={rootPath}>{components}</RootPathContext.Provider>;
  }
  return components;
};
