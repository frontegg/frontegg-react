import React from 'react';
import { FRONTEGG_AFTER_AUTH_REDIRECT_URL } from '../constants';
import { AuthActions, AuthState } from '../Api';
import { withAuth } from '../HOCs';
import { Loader, WithT, withT } from '@frontegg/react-core';

const stateMapper = ({ routes, onRedirectTo }: AuthState) => ({ routes, onRedirectTo });
const actionsMapper = ({ resetLoginState }: AuthActions) => ({ resetLoginState });

type Props = ReturnType<typeof stateMapper> & ReturnType<typeof actionsMapper> & WithT

class LoginSuccessRedirect extends React.Component<Props> {
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
    const { t } = this.props;
    return <>
      <div className='fe-center'> {t('auth.login.authentication-succeeded')}</div>
      <Loader/>
    </>;
  }
}


export default withAuth(withT()(LoginSuccessRedirect), stateMapper, actionsMapper);
