import React, { FC } from 'react';
import { RendererFunctionFC, Loader, omitProps, useT } from '@frontegg/react-core';

export interface LoginSuccessRedirectProps {
  renderer?: RendererFunctionFC<LoginSuccessRedirectProps>;
}

export const LoginSuccessRedirect: FC<LoginSuccessRedirectProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }
  return (
    <>
      <div className='fe-center'> {t('auth.login.authentication-succeeded')}</div>
      <Loader />
    </>
  );
};
