import { resetStateByKey, storeName, typeReducerForKey } from '../utils';
import { createAction } from '@reduxjs/toolkit';
import { IForgotPassword, IResetPassword } from '@frontegg/react-core';
import { ForgotPasswordActions, ForgotPasswordState, ForgotPasswordStep } from './interfaces';

export const forgotPasswordState: ForgotPasswordState = {
  step: ForgotPasswordStep.forgotPassword,
  loading: false,
  email: '',
};

export const forgotPasswordStateReducers = {
  setForgotPasswordState: typeReducerForKey<ForgotPasswordState>('forgotPasswordState'),
  resetForgotPasswordState: resetStateByKey<ForgotPasswordState>('forgotPasswordState'),
};

export const forgotPasswordActions: ForgotPasswordActions = {
  forgotPassword: createAction(`${storeName}/forgotPassword`, (payload: IForgotPassword) => ({ payload })),
  resetPassword: createAction(`${storeName}/resetPassword`, (payload: IResetPassword) => ({ payload })),
};
