import { createAction } from '@reduxjs/toolkit';
import { IForgotPassword, IResetPassword } from '@frontegg/rest-api';
import { resetStateByKey, storeName, typeReducerForKey } from '../utils';
import { ForgotPasswordState, ForgotPasswordStep } from './interfaces';

export * from './interfaces';

export const forgotPasswordState: ForgotPasswordState = {
  step: ForgotPasswordStep.forgotPassword,
  loading: false,
  email: '',
  passwordConfig: null,
};

export const forgotPasswordStateReducers = {
  setForgotPasswordState: typeReducerForKey<ForgotPasswordState>('forgotPasswordState'),
  resetForgotPasswordState: resetStateByKey<ForgotPasswordState>('forgotPasswordState', { forgotPasswordState }),
};

export const forgotPasswordActions = {
  forgotPassword: createAction(`${storeName}/forgotPassword`, (payload: IForgotPassword) => ({ payload })),
  resetPassword: createAction(`${storeName}/resetPassword`, (payload: IResetPassword) => ({ payload })),
  loadPasswordConfig: createAction(`${storeName}/loadPasswordConfig`),
};
