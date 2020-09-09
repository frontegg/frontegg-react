import React, { FC } from 'react';
import { Button, omitProps, RendererFunctionFC, useT } from '@frontegg/react-core';
import { AuthState } from '../Api';
import { useAuth } from '../hooks';

export interface ResetPasswordFailedProps {
  renderer?: RendererFunctionFC<ResetPasswordFailedProps>;
}

const stateMapper = ({ routes, onRedirectTo }: AuthState) => ({ ...routes, onRedirectTo });
export const ResetPasswordFailed: FC<ResetPasswordFailedProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const { loginUrl, onRedirectTo, resetForgotPasswordState } = useAuth(stateMapper);
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
