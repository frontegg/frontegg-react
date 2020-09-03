import React, { ComponentType } from 'react';
import { Button, omitProps, RendererFunction, WithT, withT } from '@frontegg/react-core';
import { withAuth } from '../HOCs';
import { AuthActions, AuthState } from '../Api';

const stateMapper = ({ routes, onRedirectTo }: AuthState) => ({ routes, onRedirectTo });
const actionsMapper = ({ resetLoginState }: AuthActions) => ({ resetLoginState });

export interface LoginWithSSOFailedProps {
  renderer?: RendererFunction<Props, LoginWithSSOFailedProps>
}

type Props = ReturnType<typeof stateMapper> & ReturnType<typeof actionsMapper> & WithT & LoginWithSSOFailedProps

class LoginWithSSOFailedComponent extends React.Component<Props> {
  render() {
    const { t, renderer, routes: { loginUrl }, onRedirectTo, resetLoginState } = this.props;
    if (renderer) {
      return renderer(omitProps(this.props, ['renderer']));
    }

    return <>
      <div className='fe-error-message'>
        {t('auth.login.login-with-sso-failed')}
      </div>
      <Button fullWidth={true} onClick={() => {
        resetLoginState();
        onRedirectTo(loginUrl);
      }}>
        {t('auth.login.back-to-login')}
      </Button>
    </>;
  }
}

export const LoginWithSSOFailed = withAuth(
  withT()(LoginWithSSOFailedComponent),
  stateMapper,
  actionsMapper,
) as ComponentType<LoginWithSSOFailedProps>;
