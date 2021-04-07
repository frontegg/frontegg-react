import { createAction } from '@reduxjs/toolkit';
import { ILoginViaSocialLogin, ISetSocialLoginError } from '@frontegg/rest-api';
import { resetStateByKey, typeReducerForKey } from '../utils';
import { SocialLoginState } from './interfaces';
import { authStoreName } from '../../constants';
import { ActionDispatchMatcher } from '../../interfaces';

const socialLoginState: SocialLoginState = {
  firstLoad: true,
  loading: false,
  error: '',
};

const reducers = {
  setSocialLoginsState: typeReducerForKey<SocialLoginState>('socialLoginState'),
  resetSocialLoginsState: resetStateByKey<SocialLoginState>('socialLoginState', { socialLoginState }),
};

const actions = {
  loadSocialLoginsConfiguration: createAction(`${authStoreName}/loadSocialLoginsConfiguration`),
  loginViaSocialLogin: createAction(`${authStoreName}/loginViaSocialLogin`, (payload: ILoginViaSocialLogin) => ({
    payload,
  })),
  setSocialLoginError: createAction(`${authStoreName}/setSocialLoginError`, (payload: ISetSocialLoginError) => ({
    payload,
  })),
};

/**
 *  To be used for actions types after dispatch, and should contains
 *  the reducers and actions as standalone function
 */
type DispatchedActions = {
  setSocialLoginsState: (state: Partial<SocialLoginState>) => void;
  resetSocialLoginsState: () => void;
  loadSocialLoginsConfiguration: () => void;
  loginViaSocialLogin: (payload: ILoginViaSocialLogin) => void;
  setSocialLoginError: (payload: ISetSocialLoginError) => void;
};

// noinspection JSUnusedLocalSymbols
/**
 *  if you see error in matcher that's mean the DispatchAction does not
 *  contains the same functions in reducers and actions
 */
const Matcher: ActionDispatchMatcher<typeof reducers, typeof actions, DispatchedActions> = {};

export type SocialLoginActions = DispatchedActions;
export { socialLoginState, reducers as socialLoginsReducer, actions as socialLoginsActions };
