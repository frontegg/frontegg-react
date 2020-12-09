import { resetStateByKey, storeName, typeReducerForKey } from '../utils';
import { SignUpStage, SignUpState } from './interfaces';
import { createAction } from '@reduxjs/toolkit';
import { ISignUpUser } from '@frontegg/rest-api';

export const signUpState: SignUpState = {
  loading: false,
  allowSignUps: false,
  firstLoad: true,
  stage: SignUpStage.SignUp,
};

export const signUpStateReducers = {
  setSignUpState: typeReducerForKey<SignUpState>('signUpState'),
  resetSignUpState: resetStateByKey<SignUpState>('signUpState', { signUpState }),
};

export const signUpActions = {
  signUpUser: createAction(`${storeName}/signUpUser`, (payload: ISignUpUser) => ({ payload })),
  resetSignUpStateSoft: createAction(`${storeName}/resetSignUpStateSoft`),
};
