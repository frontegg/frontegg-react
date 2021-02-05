import {
  AuthState,
  ForgotPasswordState,
  forgotPasswordReducers,
  forgotPasswordActions,
  ForgotPasswordActions,
} from '@frontegg/redux-store/auth';
import { bindActionCreators } from '@reduxjs/toolkit';
import { memoEqual, useDispatch, useSelector } from '@frontegg/react-core';
import { pluginName, sliceReducerActionsBy, StateHookFunction } from '../hooks';

export type ForgotPasswordStateMapper<S extends object> = (state: ForgotPasswordState) => S;

export const useForgotPasswordState: StateHookFunction<ForgotPasswordState> = <S extends object>(
  stateMapper?: ForgotPasswordStateMapper<S>
): S => {
  return useSelector(
    ({ [pluginName]: { forgotPasswordState } }: { auth: AuthState }) =>
      stateMapper?.(forgotPasswordState) ?? forgotPasswordState,
    memoEqual
  ) as any;
};

export const useForgotPasswordActions = (): ForgotPasswordActions => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...forgotPasswordActions, ...sliceReducerActionsBy(forgotPasswordReducers) }, dispatch);
};
