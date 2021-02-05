import { AuthState, LoginState, loginReducers, loginActions, LoginActions } from '@frontegg/redux-store/auth';
import { bindActionCreators } from '@reduxjs/toolkit';
import { memoEqual, useDispatch, useSelector } from '@frontegg/react-core';
import { pluginName, sliceReducerActionsBy, StateHookFunction } from '../hooks';

export type LoginStateMapper<S extends object> = (state: LoginState) => S;

export const useLoginState: StateHookFunction<LoginState> = <S extends object>(
  stateMapper?: LoginStateMapper<S>
): S => {
  return useSelector(
    ({ [pluginName]: { loginState } }: { auth: AuthState }) => stateMapper?.(loginState) ?? loginState,
    memoEqual
  ) as any;
};

export const useLoginActions = (): LoginActions => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...loginActions, ...sliceReducerActionsBy(loginReducers) }, dispatch);
};
