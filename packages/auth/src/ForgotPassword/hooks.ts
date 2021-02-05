import {
  AuthState,
  ForgotPasswordState,
  forgotPasswordReducers,
  forgotPasswordActions,
  ForgotPasswordActions,
} from '@frontegg/redux-store/auth';
import { bindActionCreators } from '@reduxjs/toolkit';
import { memoEqual, useDispatch, useSelector } from '@frontegg/react-core';
import { pluginName, sliceReducerActionsBy } from '../hooks';

export type ForgotPasswordStateMapper<S extends object> = (state: ForgotPasswordState) => S;
const defaultForgotPasswordStateMapper: any = (state: ForgotPasswordState) => ({ ...state });

export const useForgotPasswordState = <S extends object>(
  stateMapper: ForgotPasswordStateMapper<S> = defaultForgotPasswordStateMapper
): S => {
  return useSelector(
    ({ [pluginName]: { forgotPasswordState } }: { auth: AuthState }) => stateMapper(forgotPasswordState),
    memoEqual
  );
};

export const useForgotPasswordActions = (): ForgotPasswordActions => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...forgotPasswordActions, ...sliceReducerActionsBy(forgotPasswordReducers) }, dispatch);
};
