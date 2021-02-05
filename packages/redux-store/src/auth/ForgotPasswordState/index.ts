import { createAction } from '@reduxjs/toolkit';
import { IForgotPassword, IResetPassword } from '@frontegg/rest-api';
import { resetStateByKey, typeReducerForKey } from '../utils';
import { ForgotPasswordState, ForgotPasswordStep } from './interfaces';
import { authStoreName } from '../../constants';
import { ActionDispatchMatcher } from '../../interfaces';

const forgotPasswordState: ForgotPasswordState = {
  step: ForgotPasswordStep.forgotPassword,
  loading: false,
  email: '',
  passwordConfig: null,
};

const reducers = {
  setForgotPasswordState: typeReducerForKey<ForgotPasswordState>('forgotPasswordState'),
  resetForgotPasswordState: resetStateByKey<ForgotPasswordState>('forgotPasswordState', { forgotPasswordState }),
};

const actions = {
  forgotPassword:
    createAction(`${authStoreName}/forgotPassword`, (payload: IForgotPassword) => ({ payload })),
  resetPassword:
    createAction(`${authStoreName}/resetPassword`, (payload: IResetPassword) => ({ payload })),
  loadPasswordConfig:
    createAction(`${authStoreName}/loadPasswordConfig`),
};


/**
 *  To be used for actions types after dispatch, and should contains
 *  the reducers and actions as standalone function
 */
type DispatchedActions = {
  setForgotPasswordState: (state: Partial<ForgotPasswordState>) => void;
  resetForgotPasswordState: () => void;
  forgotPassword: (payload: IForgotPassword) => void;
  resetPassword: (payload: IResetPassword) => void;
  loadPasswordConfig: () => void;
}

// noinspection JSUnusedLocalSymbols
/**
 *  if you see error in matcher that's mean the DispatchAction does not
 *  contains the same functions in reducers and actions
 */
const Matcher: ActionDispatchMatcher<typeof reducers, typeof actions, DispatchedActions> = {};

export type ForgotPasswordActions = DispatchedActions;
export {
  forgotPasswordState,
  reducers as forgotPasswordReducers,
  actions as forgotPasswordActions,
};
