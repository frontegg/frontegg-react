import React from 'react';
import { AuthProviderProps, AuthProviderState, LoginStep } from './interfaces';
import { AuthContext, initialAuthProviderState } from './AuthContext';
import { Get } from '../helpers';
import * as Api from '../Api';

export class AuthProvider extends React.Component<AuthProviderProps, AuthProviderState> {
  private timer?: NodeJS.Timeout;
  state = initialAuthProviderState;

  constructor(props: AuthProviderProps) {
    super(props);
    this.requestAuthorize(true);
  }

  private getMetadata = async () => {
    this.setState({ isSSOAuth: await Api.checkIfIsSSOAuth(this.props.context) });
  };

  private requestAuthorize = async (metadata?: boolean) => {
    const { context } = this.props;
    try {
      metadata && (await this.getMetadata());
      await Get(context, '/user/token/refresh');
      this.setState({ isLoading: false, isAuthenticated: true });
      this.startRefreshWaiting(20000);
    } catch (e) {
      this.setState({ isLoading: false });
    }
  };

  private startRefreshWaiting = (expired: number) => {
    this.timer = setTimeout(() => this.requestAuthorize(), expired - 1000);
  };


  private reduceState = <T extends keyof AuthProviderState>(key: T, state: Partial<AuthProviderState[T]>) => {
    this.setState({ [key]: { ...this.state[key], ...state } } as any);
  };

  preLogin = async (email: string) => {
    this.reduceState('loginState', { loading: true });
    const isSSOAuth = await Api.preLogin(this.props.context, email);
    this.reduceState('loginState', { loading: false, step: isSSOAuth ? LoginStep.redirectToSSO : LoginStep.loginWithPassword });
  };


  login = async (email: string, password: string) => {
    this.reduceState('loginState', { loading: true });
    let res;
    try {
      // res = await Api.login(this.props.context, email, password);
      // const user = { mfaRequired: true, mfaToken: undefined } as a;
      // const { mfaRequired, mfaToken } = res;
      // if (mfaRequired) {
      this.reduceState('loginState', {
        loading: false,
        mfaRequired:true,
        mfaToken:"asdasd",
        step: LoginStep.loginWithTwoFactor,
      });
      // } else {
      //   this.setState({
      //     ...initialAuthProviderState,
      //     isLoading: false,
      //     isAuthenticated: true,
      //     user: res,
      //   });
      // }
    } catch (e) {
      console.log(e);
      this.reduceState('loginState', { loading: false, error: e.message });
    }

  };

  logout = async () => {
    await Api.logout(this.props.context);
    this.timer && clearTimeout(this.timer);
    this.setState(initialAuthProviderState);
  };

  render() {
    const { children, ...props } = this.props;
    const { logout, preLogin, login } = this;
    return <AuthContext.Provider value={{
      ...this.state,
      ...props,
      logout,
      preLogin,
      login,
    }}>
      {children}
    </AuthContext.Provider>;
  }
}
