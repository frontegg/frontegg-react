import { AuthState, LoginState, loginReducers, loginActions, LoginActions } from '@frontegg/redux-store/auth';
import { bindActionCreators } from '@reduxjs/toolkit';
import { memoEqual, useDispatch, useSelector } from '@frontegg/react-core';
import { pluginName, sliceReducerActionsBy } from '../hooks';

export type LoginStateMapper<S extends object> = (state: LoginState) => S;

type StateHook = () => LoginState & (<S extends object>(mapper: (state: LoginState) => S) => S);

export const useLoginState: StateHook = <S extends object>(stateMapper?: LoginStateMapper<S>): S => {
  return useSelector(
    ({ [pluginName]: { loginState } }: { auth: AuthState }) => stateMapper?.(loginState) ?? loginState,
    memoEqual
  ) as any;
};

export const useLoginActions = (): LoginActions => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...loginActions, ...sliceReducerActionsBy(loginReducers) }, dispatch);
};
