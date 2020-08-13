import {
  ActivateAccountPayload,
  ActivateState,
  ActivateStep, AuthRoutes, AuthState,
  ForgotPasswordPayload,
  ForgotPasswordState,
  ForgotPasswordStep,
  LoginPayload,
  LoginState,
  LoginStep, LogoutPayload,
  PreLoginPayload, ResetPasswordPayload,
  VerifyMFAPayload,
} from './interfaces';
import { FronteggState } from '@api';
import { createActionWithoutReducer, pluginReducer } from '@api/ApiUtils';


export interface AuthenticationState {
  auth: AuthState;
  login: LoginState;
  activateAccount: ActivateState;
  forgetPassword: ForgotPasswordState;
  routes: AuthRoutes;
}

export const authInitialState: AuthenticationState = {
  auth: {
    loading: true,
    isAuthenticated: false,
    isSSOAuth: false,
  },

  login: {
    step: LoginStep.preLogin,
    loading: false,
  },
  activateAccount: {
    step: ActivateStep.activating,
    loading: false,
  },
  forgetPassword: {
    step: ForgotPasswordStep.forgotPassword,
    loading: false,
    email: '',
  },

  routes: {
    authenticatedUrl: '/',
    loginUrl: '/account/login',
    logoutUrl: '/account/logout',
    activateUrl: '/account/activate',
    forgetPasswordUrl: '/account/forget-password',
    resetPasswordUrl: '/account/reset-password',
  },
};

export const authReducers = {
  setAuthState: pluginReducer<FronteggState, AuthState>('auth'),
  setLoginState: pluginReducer<FronteggState, LoginState>('login'),
  setActivateState: pluginReducer<FronteggState, ActivateState>('activateAccount'),
  setForgotPasswordState: pluginReducer<FronteggState, ForgotPasswordState>('forgetPassword'),

  // actions only
  requestAuthorize: createActionWithoutReducer<boolean>(),
  preLogin: createActionWithoutReducer<PreLoginPayload>(),
  login: createActionWithoutReducer<LoginPayload>(),
  verifyMfa: createActionWithoutReducer<VerifyMFAPayload>(),
  activateAccount: createActionWithoutReducer<ActivateAccountPayload>(),
  forgotPassword: createActionWithoutReducer<ForgotPasswordPayload>(),
  resetPassword: createActionWithoutReducer<ResetPasswordPayload>(),
  logout: createActionWithoutReducer<LogoutPayload>(),
};
