import React, { FC } from 'react';
import { Button, omitProps, RendererFunctionFC, WithT, useT } from '@frontegg/react-core';
import { AuthActions, AuthState } from '../Api';
import { useAuth } from '../hooks';

const stateMapper = ({ onRedirectTo, routes }: AuthState) => ({ onRedirectTo, routes });
const actionsMapper = ({ resetForgotPasswordState }: AuthActions) => ({ resetForgotPasswordState });

export interface ForgotPasswordSuccessRedirectProps {
  renderer?: RendererFunctionFC<ForgotPasswordSuccessRedirectProps>;
}

export type Props = ReturnType<typeof stateMapper> &
  ReturnType<typeof actionsMapper> &
  WithT &
  ForgotPasswordSuccessRedirectProps;

export const ForgotPasswordSuccessRedirect: FC<ForgotPasswordSuccessRedirectProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const {
    onRedirectTo,
    routes: { loginUrl },
    resetForgotPasswordState,
  } = useAuth(({ onRedirectTo, routes }) => ({ onRedirectTo, routes }));
  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }
  return (
    <>
      <div className='fe-center fe-success-message fe-mb-4'>{t('auth.forgot-password.reset-email-sent')}</div>
      <Button
        data-test-id="forgotPassword-btn"
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
