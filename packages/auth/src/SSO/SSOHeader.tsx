import React from 'react';
import { useHistory } from 'react-router';
import { checkRootPath, PageHeader, PageHeaderProps, useProxyComponent, useT } from '@frontegg/react-core';
import { HideOption } from '../interfaces';

export const SSOHeader = (props: PageHeaderProps & HideOption) => {
  const rootPath = checkRootPath('SSO.Header must be rendered inside a SSO.Page component');
  const proxyPortals = useProxyComponent(props);

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
