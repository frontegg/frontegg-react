import React, { FC, useEffect } from 'react';
import { AuthState } from '../Api';
import { Loader, omitProps, RendererFunctionFC, useT } from '@frontegg/react-core';
import { useAuth } from '../hooks';


export interface ResetPasswordSuccessRedirectProps {
  renderer?: RendererFunctionFC<ResetPasswordSuccessRedirectProps>;
}

export const ResetPasswordSuccessRedirect: FC<ResetPasswordSuccessRedirectProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const { loginUrl, onRedirectTo, resetForgotPasswordState } =
    useAuth(({ routes, onRedirectTo }: AuthState) => ({ ...routes, onRedirectTo }));

  useEffect(() => {
    setTimeout(() => {
      resetForgotPasswordState();
      onRedirectTo(loginUrl);
    }, 1000);
  }, []);

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }
  return <>
    <div className='fe-center fe-success-message'>
      {t('auth.forgot-password.password-has-been-changed')}
    </div>
    <Loader center/>
  </>;
};
