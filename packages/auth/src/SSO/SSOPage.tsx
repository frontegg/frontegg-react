import React, { ComponentType } from 'react';
import { SSO, SSOProps } from './SSO';
import {
  WithT, withT,
  FronteggClass, ComponentsTypesWithProps, PageHeader, PageHeaderProps,
} from '@frontegg/react-core';
import { withProtectedRoute } from '../HOCs';
import { RouteComponentProps, withRouter } from 'react-router';


type Components = {
  SSO: SSOProps;
  PageHeader: PageHeaderProps;
}

export interface SSOPageProps {
  components?: ComponentsTypesWithProps<Components>;
  rootPath: string; // default: '/sso'
}

type Props = WithT & RouteComponentProps & SSOPageProps

class SSOPageComponent extends FronteggClass<Components, Props> {
  constructor(props: Props) {
    super(props, { SSO, PageHeader });
  }

  render() {
    const { t, rootPath = '/sso', location, history } = this.props;
    const { SSO, PageHeader } = this.comps;
    return <div className='fe-sso-page'>
      <PageHeader title={t('auth.sso.title')}
                  subTitle={t('auth.sso.subtitle')}
                  onBackButtonClick={location.pathname !== rootPath ? () => {
                    history.replace(rootPath);
                  } : undefined}
                  {...this.compsProps.PageHeader}/>
      <SSO rootPath={rootPath}/>
    </div>;
  }
}


export const SSOPage = withProtectedRoute(withRouter(withT()(SSOPageComponent))) as ComponentType<SSOPageProps>;
