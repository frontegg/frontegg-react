import { SocialLoginsState } from './interfaces';
import { createAction } from '@reduxjs/toolkit';
import { resetStateByKey, storeName, typeReducerForKey } from '../utils';
import { ILoginViaSocialLogin, ISetSocialLoginError } from '@frontegg/rest-api';

export * from './interfaces';

export const socialLoginsState: SocialLoginsState = {
  firstLoad: true,
  loading: false,
  error: '',
};

export const socialLoginsStateReducer = {
  setSocialLoginsState: typeReducerForKey<SocialLoginsState>('socialLoginsState'),
  resetSocialLoginsState: resetStateByKey<SocialLoginsState>('socialLoginsState', { socialLoginsState }),
};

export const socialLoginsActions = {
  loadSocialLoginsConfiguration: createAction(`${storeName}/loadSocialLoginsConfiguration`),
  loginViaSocialLogin: createAction(`${storeName}/loginViaSocialLogin`, (payload: ILoginViaSocialLogin) => ({
    payload,
  })),
  setSocialLoginError: createAction(`${storeName}/setSocialLoginError`, (payload: ISetSocialLoginError) => ({
    payload,
  })),
};
