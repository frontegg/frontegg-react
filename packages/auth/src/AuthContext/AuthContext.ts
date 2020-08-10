import React from 'react';
import { AuthProviderState, IAuthContext, LoginStep } from './interfaces';

/**
 * @ignore
 */
const undeclared = (): never => {
  throw new Error('You forgot to wrap your component in <FronteggAuthProvider>.');
};


// The initial auth provider state.
export const initialAuthProviderState: AuthProviderState = {
  context: {
    baseUrl: '',
    tokenResolver: () => '',
  },
  // public context state
  isAuthenticated: false,
  isLoading: true,
  loginUrl: '/login',
  authorizationUrl: '/',
  isSSOAuth: false,
  // private context state
  loginState: {
    step: LoginStep.preLogin,
    loading: false,
  },
  // forgetPasswordState: {},
  // signUpState: {},
};
export const initialAuthContext: IAuthContext = {
  ...initialAuthProviderState,
  // public auth functions
  logout: undeclared,
  preLogin: undeclared,
  login: undeclared,
};

export const AuthContext = React.createContext<IAuthContext>(initialAuthContext);
