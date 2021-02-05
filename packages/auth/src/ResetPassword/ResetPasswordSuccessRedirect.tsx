import React, { FC, useEffect } from 'react';
import { Loader, omitProps, RendererFunctionFC, useT } from '@frontegg/react-core';
import { useAuthRoutes, useOnRedirectTo } from '../hooks';
import { useForgotPasswordActions } from '../ForgotPassword';

export interface ResetPasswordSuccessRedirectProps {
  renderer?: RendererFunctionFC<ResetPasswordSuccessRedirectProps>;
}

export const ResetPasswordSuccessRedirect: FC<ResetPasswordSuccessRedirectProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const { loginUrl } = useAuthRoutes();
  const onRedirectTo = useOnRedirectTo();
  const { resetForgotPasswordState } = useForgotPasswordActions();

  useEffect(() => {
    setTimeout(() => {
      onRedirectTo(loginUrl);
    }, 1000);
    return resetForgotPasswordState;
  }, [onRedirectTo, resetForgotPasswordState]);

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }
  return (
    <>
      <div className='fe-center fe-success-message'>{t('auth.forgot-password.password-has-been-changed')}</div>
      <div className='fe-relative fe-mt-4'>
        <Loader center />
      </div>
    </>
  );
};
