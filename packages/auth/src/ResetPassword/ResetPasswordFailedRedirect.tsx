import React, { FC } from 'react';
import { Button, omitProps, RendererFunctionFC, useT } from '@frontegg/react-core';
import { useAuthRoutes, useOnRedirectTo } from '../hooks';
import { useForgotPasswordActions } from '../ForgotPassword';

export interface ResetPasswordFailedProps {
  renderer?: RendererFunctionFC<ResetPasswordFailedProps>;
}

export const ResetPasswordFailed: FC<ResetPasswordFailedProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const { loginUrl } = useAuthRoutes();
  const onRedirectTo = useOnRedirectTo();
  const { resetForgotPasswordState } = useForgotPasswordActions();

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }

  return (
    <>
      <div className='fe-error-message'>
        {t('auth.forgot-password.reset-password-failed-title')}
        <br />
        {t('auth.forgot-password.reset-password-failed-description')}
      </div>
      <Button
        data-test-id='loginBack-btn'
        fullWidth
        onClick={() => {
          resetForgotPasswordState();
          onRedirectTo(loginUrl);
        }}
      >
        {t('auth.forgot-password.back-to-login')}
      </Button>
    </>
  );
};
