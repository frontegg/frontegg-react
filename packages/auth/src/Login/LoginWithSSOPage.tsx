import React from 'react';
import { authPageWrapper } from '../components/authPageWrapper';
import { withAuth } from '../HOCs';
import { AuthActions, AuthState } from '../Api';
import { withT, WithT, Loader, Button } from '@frontegg/react-core';
import { LoginWithSSOFailed } from './LoginWithSSOFailed';

const stateMapper = ({ routes, onRedirectTo }: AuthState) => ({ routes, onRedirectTo });
const actionsMapper = ({ logout, resetSSOState, postLogin }: AuthActions) => ({ logout, resetSSOState, postLogin });

type Props = ReturnType<typeof stateMapper> & ReturnType<typeof actionsMapper> & WithT

class LoginWithSSOComponent extends React.Component<Props> {
  componentDidMount() {
    const url = new URL(window?.location.href);
    const RelayState = url.searchParams.get('RelayState') || '';
    const SAMLResponse = url.searchParams.get('SAMLResponse') || '';
    if (RelayState && SAMLResponse) {
      this.props.postLogin({ RelayState, SAMLResponse });
    }
  }

  render() {
    const url = new URL(window?.location.href);
    const RelayState = url.searchParams.get('RelayState') || '';
    const SAMLResponse = url.searchParams.get('SAMLResponse') || '';

    if (!RelayState || !SAMLResponse) {
      return <LoginWithSSOFailed/>;
    }
    return <div className='fe-login-component'>
      <Loader center/>
    </div>;
  }
}

export const LoginWithSSO = withAuth(withT()(LoginWithSSOComponent), stateMapper, actionsMapper);

export const LoginWithSSOPage = authPageWrapper(LoginWithSSO);
