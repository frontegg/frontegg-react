import { createAction } from '@reduxjs/toolkit';
import { ISignUpUser } from '@frontegg/rest-api';
import { resetStateByKey, typeReducerForKey } from '../utils';
import { SignUpStage, SignUpState } from './interfaces';
import { ActionDispatchMatcher } from '../../interfaces';
import { authStoreName } from '../../constants';

const signUpState: SignUpState = {
  loading: false,
  allowSignUps: false,
  allowNotVerifiedUsersLogin: false,
  firstLoad: true,
  stage: SignUpStage.SignUp,
};

const reducers = {
  setSignUpState: typeReducerForKey<SignUpState>('signUpState'),
  resetSignUpState: resetStateByKey<SignUpState>('signUpState', { signUpState }),
};

const actions = {
  signUpUser: createAction(`${authStoreName}/signUpUser`, (payload: ISignUpUser) => ({ payload })),
  resetSignUpStateSoft: createAction(`${authStoreName}/resetSignUpStateSoft`),
};

/**
 *  To be used for actions types after dispatch, and should contains
 *  the reducers and actions as standalone function
 */
type DispatchedActions = {
  setSignUpState: (state: Partial<SignUpState>) => void;
  resetSignUpState: () => void;
  signUpUser: (payload: ISignUpUser) => void;
  resetSignUpStateSoft: () => void;
};

// noinspection JSUnusedLocalSymbols
/**
 *  if you see error in matcher that's mean the DispatchAction does not
 *  contains the same functions in reducers and actions
 */
const Matcher: ActionDispatchMatcher<typeof reducers, typeof actions, DispatchedActions> = {};

export type SignUpActions = DispatchedActions;
export { signUpState, reducers as signUpReducers, actions as signUpActions };
