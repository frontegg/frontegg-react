import React, { FC } from 'react';
import { SSO, SSOProps } from './SSO';
import {
  WithT, ComponentsTypesWithProps, PageHeader, PageHeaderProps, RootPathContext,
} from '@frontegg/react-core';
import { RouteComponentProps, useHistory, useRouteMatch } from 'react-router';
import { useT, useDynamicComponents, useRootPath } from '@frontegg/react-core';

type Components = { SSO: SSOProps; PageHeader: PageHeaderProps; }

export interface SSOPageProps {
  components?: ComponentsTypesWithProps<Components>;
  rootPath?: string; // default: /sso
}

const defaultComponents = { SSO, PageHeader };

export const SSOPage: FC<SSOPageProps & Partial<RouteComponentProps>> = (props) => {
  const Dynamic = useDynamicComponents(defaultComponents, props);
  const { t } = useT();
  const history = useHistory();
  const [rootPath] = useRootPath(props, '/sso');

  return <RootPathContext.Provider value={rootPath}>
    <div className='fe-sso-page'>
      <Dynamic.PageHeader title={t('auth.sso.title')}
                          subTitle={t('auth.sso.subtitle')}
                          onBackButtonClick={location.pathname !== rootPath ? () => {
                            history.replace(rootPath);
                          } : undefined}
                          {...props.components?.PageHeader}/>
      <Dynamic.SSO/>
    </div>
  </RootPathContext.Provider>;
};
