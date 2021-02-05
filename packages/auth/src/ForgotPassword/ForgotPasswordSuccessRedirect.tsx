import React, { FC } from 'react';
import { Button, omitProps, RendererFunctionFC, useT } from '@frontegg/react-core';
import { useAuthRoutes, useOnRedirectTo } from '../hooks';
import { useForgotPasswordActions } from './hooks';

export interface ForgotPasswordSuccessRedirectProps {
  renderer?: RendererFunctionFC<ForgotPasswordSuccessRedirectProps>;
}

export const ForgotPasswordSuccessRedirect: FC<ForgotPasswordSuccessRedirectProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const onRedirectTo = useOnRedirectTo();
  const { loginUrl } = useAuthRoutes();
  const { resetForgotPasswordState } = useForgotPasswordActions();

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }
  return (
    <>
      <div className='fe-center fe-success-message fe-mb-4'>{t('auth.forgot-password.reset-email-sent')}</div>
      <Button
        data-test-id='forgotPassword-btn'
        fullWidth={true}
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
