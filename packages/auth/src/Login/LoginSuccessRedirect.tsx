import React, { ReactNode } from 'react';
import { FRONTEGG_AFTER_AUTH_REDIRECT_URL } from '../constants';
import { AuthActions, AuthState } from '../Api';
import { withAuth } from '../HOCs';
import { Loader, omitProps, RendererFunction, WithT, withT } from '@frontegg/react-core';

const stateMapper = ({ routes, onRedirectTo }: AuthState) => ({ routes, onRedirectTo });
const actionsMapper = ({ resetLoginState }: AuthActions) => ({ resetLoginState });


export interface LoginSuccessRedirectProps {
  renderer?: RendererFunction<Props, LoginSuccessRedirectProps>
}

type Props = ReturnType<typeof stateMapper> & ReturnType<typeof actionsMapper> & WithT & LoginSuccessRedirectProps

class LoginSuccessRedirectComponent extends React.Component<Props> {
  componentDidMount() {
    const { onRedirectTo, resetLoginState } = this.props;
    let { routes: { authenticatedUrl } } = this.props;
    const afterAuthRedirect = window.localStorage.getItem(FRONTEGG_AFTER_AUTH_REDIRECT_URL);
    if (afterAuthRedirect) {
      authenticatedUrl = afterAuthRedirect;
      window.localStorage.removeItem(FRONTEGG_AFTER_AUTH_REDIRECT_URL);
    }
    setTimeout(() => {
      resetLoginState();
      onRedirectTo(authenticatedUrl);
    }, 500);
  }

  render() {
    const { t, renderer } = this.props;
    if (renderer) {
      return renderer(omitProps(this.props, ['renderer', 'components']));
    }
    return <>
      <div className='fe-center'> {t('auth.login.authentication-succeeded')}</div>
      <Loader/>
    </>;
  }
}


export const LoginSuccessRedirect = withAuth(withT()(LoginSuccessRedirectComponent), stateMapper, actionsMapper);
