import React from 'react';
import { Button, omitProps, RendererFunction, withT, WithT } from '@frontegg/react-core';
import { AuthActions, AuthState } from '../Api';
import { withAuth } from '../HOCs';


const stateMapper = ({ onRedirectTo, routes }: AuthState) => ({ onRedirectTo, routes });
const actionsMapper = ({ resetForgotPasswordState }: AuthActions) => ({ resetForgotPasswordState });

export interface ForgotPasswordSuccessRedirectProps {
  renderer?: RendererFunction<Props, ForgotPasswordSuccessRedirectProps>
}

export type Props = ReturnType<typeof stateMapper> & ReturnType<typeof actionsMapper> & WithT & ForgotPasswordSuccessRedirectProps

class ForgotPasswordSuccessRedirectComponent extends React.Component<Props> {
  render() {
    const { renderer, t, routes: { loginUrl }, onRedirectTo, resetForgotPasswordState } = this.props;
    if (renderer) {
      return renderer(omitProps(this.props, ['renderer', 'components']));
    }

    return <>
      <div className='fe-center fe-success-message fe-mb-2'>
        {t('auth.forgot-password.reset-email-sent')}
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

export const ForgotPasswordSuccessRedirect = withAuth(withT()(ForgotPasswordSuccessRedirectComponent), stateMapper, actionsMapper);
