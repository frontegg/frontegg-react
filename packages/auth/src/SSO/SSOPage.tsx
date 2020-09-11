import React, { FC, useMemo } from 'react';
import { SSORouter } from './SSORouter';
import { useHistory } from 'react-router';
import {
  useT,
  useRootPath,
  PageHeader,
  PageHeaderProps,
  checkValidChildren,
  RootPathContext,
  checkRootPath,
} from '@frontegg/react-core';
import { BasePageProps } from './interfaces';

const Header = (props: PageHeaderProps & { hide?: boolean }) => {
  const rootPath = checkRootPath('SSOPage.Header must be rendered inside a SSOPage component');

  const history = useHistory();
  const { t } = useT();
  if (props.hide) {
    return null;
  }
  let onBackButtonPressed;
  if (location.pathname !== rootPath) {
    onBackButtonPressed = () => history.replace(rootPath!);
  }
  return (
    <PageHeader
      title={t('auth.sso.title')}
      subTitle={t('auth.sso.subtitle')}
      onBackButtonClick={onBackButtonPressed}
      {...props}
    />
  );
};

export type SSOPageSubComponents = {
  Header: typeof Header;
  SSORouter: typeof SSORouter;
};

export type SSOPageProps = BasePageProps;
const SSOPage: FC<SSOPageProps> & SSOPageSubComponents = (props) => {
  const [rootPath] = useRootPath(props, '/sso');
  useMemo(() => checkValidChildren('SSO.Page', 'SSO', props.children, { SSORouter }), [props.children]);

  const children = props.children ?? (
    <>
      <Header />
      <SSORouter />
    </>
  );

  return (
    <RootPathContext.Provider value={rootPath}>
      <div className='fe-sso-page'>{children}</div>
    </RootPathContext.Provider>
  );
};

SSOPage.Header = Header;
SSOPage.SSORouter = SSORouter;

export { SSOPage, Header as SSOHeader };
