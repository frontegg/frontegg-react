import React, { ComponentType } from 'react';
import { Button, omitProps, RendererFunction, WithT, withT } from '@frontegg/react-core';
import { withAuth } from '../HOCs';
import { AuthActions, AuthState } from '../Api';

const stateMapper = ({ routes, onRedirectTo }: AuthState) => ({ routes, onRedirectTo });
const actionsMapper = ({ resetForgotPasswordState }: AuthActions) => ({ resetForgotPasswordState });

export interface ResetPasswordFailedProps {
  renderer?: RendererFunction<Props, ResetPasswordFailedProps>
}

type Props = ReturnType<typeof stateMapper> & ReturnType<typeof actionsMapper> & WithT & ResetPasswordFailedProps

class ResetPasswordFailedComponent extends React.Component<Props> {
  render() {
    const { t, renderer, routes: { loginUrl }, onRedirectTo, resetForgotPasswordState } = this.props;
    if (renderer) {
      return renderer(omitProps(this.props, ['renderer', 'components']));
    }

    return <>
      <div className='fe-error-message'>
        {t('auth.forgot-password.reset-password-failed-title')}
        <br/>
        {t('auth.forgot-password.reset-password-failed-description')}
      </div>
      <Button fullWidth={true} onClick={() => {
        resetForgotPasswordState();
        onRedirectTo(loginUrl);
      }}>
        {t('auth.forgot-password.back-to-login')}
      </Button>
    </>;
  }
}

export const ResetPasswordFailed = withAuth(
  withT()(ResetPasswordFailedComponent),
  stateMapper,
  actionsMapper,
) as ComponentType<ResetPasswordFailedProps>;
