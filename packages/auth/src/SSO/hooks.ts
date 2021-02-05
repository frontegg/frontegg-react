import { AuthState, ssoActions, SSOState, ssoReducers, SSOActions } from '@frontegg/redux-store/auth';
import { memoEqual, useDispatch, useSelector } from '@frontegg/react-core';
import { bindActionCreators, CaseReducerActions } from '@reduxjs/toolkit';
import { pluginName, sliceReducerActionsBy } from '../hooks';

type AuthSSOStateMapper<S extends object> = (state: SSOState) => S;
const defaultAuthSSOStateMapper: any = (state: SSOState) => ({ ...state });

export const useAuthSSOState = <S extends object>(
  stateMapper: AuthSSOStateMapper<S> = defaultAuthSSOStateMapper
): S => {
  return useSelector(({ [pluginName]: { ssoState } }: { auth: AuthState }) => stateMapper(ssoState), memoEqual);
};

export const useAuthSSOActions = (): SSOActions => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...ssoActions, ...sliceReducerActionsBy(ssoReducers) }, dispatch);
};
