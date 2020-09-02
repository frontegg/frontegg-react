import React, { ComponentType } from 'react';
import { AuthActions, AuthState } from '../Api';
import { Loader, omitProps, RendererFunction, withT, WithT } from '@frontegg/react-core';
import { withAuth } from '../HOCs';

const stateMapper = ({ routes, onRedirectTo }: AuthState) => ({ routes, onRedirectTo });
const actionsMapper = ({ resetForgotPasswordState }: AuthActions) => ({ resetForgotPasswordState });

export interface ResetPasswordSuccessRedirectProps {
  renderer?: RendererFunction<Props, ResetPasswordSuccessRedirectProps>;
}

type Props = ReturnType<typeof stateMapper> & ReturnType<typeof actionsMapper> & WithT & ResetPasswordSuccessRedirectProps

class ResetPasswordSuccessRedirectComponent extends React.Component<Props> {
  componentDidMount() {
    const { routes: { loginUrl }, onRedirectTo, resetForgotPasswordState } = this.props;
    setTimeout(() => {
      resetForgotPasswordState();
      onRedirectTo(loginUrl);
    }, 1000);
  }

  render() {
    const { renderer, t } = this.props;
    if (renderer) {
      return renderer(omitProps(this.props, ['renderer', 'components']));
    }
    return <>
      <div className='fe-center fe-success-message'>
        {t('auth.forgot-password.password-has-been-changed')}
      </div>
      <Loader center/>
    </>;
  }
}


export const ResetPasswordSuccessRedirect = withAuth(
  withT()(ResetPasswordSuccessRedirectComponent),
  stateMapper,
  actionsMapper,
) as ComponentType<ResetPasswordSuccessRedirectProps>;
