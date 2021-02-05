import { AuthState, SignUpState, signUpReducers, signUpActions, SignUpActions } from '@frontegg/redux-store/auth';
import { bindActionCreators } from '@reduxjs/toolkit';
import { memoEqual, useDispatch, useSelector } from '@frontegg/react-core';
import { pluginName, sliceReducerActionsBy } from '../hooks';

export type SignUpStateMapper<S extends object> = (state: SignUpState) => S;

type AllStateHook = () => SignUpState;
type MapperStateHook = <S extends object>(mapper: (state: SignUpState) => S) => S;
type StateHook = MapperStateHook & AllStateHook;

export const useSignUpState: StateHook = <S extends object>(stateMapper?: SignUpStateMapper<S>): S => {
  return useSelector(
    ({ [pluginName]: { signUpState } }: { auth: AuthState }) => stateMapper?.(signUpState) ?? signUpState,
    memoEqual
  ) as any;
};

export const useSignUpActions = (): SignUpActions => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...signUpActions, ...sliceReducerActionsBy(signUpReducers) }, dispatch);
};
