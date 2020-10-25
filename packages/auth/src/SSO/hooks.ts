import { ssoActions, SSOState, ssoStateReducers } from '../Api/SSOState';
import { memoEqual, useDispatch, useSelector } from '@frontegg/react-core';
import { AuthState } from '../Api';
import { bindActionCreators, CaseReducerActions } from '@reduxjs/toolkit';
import { pluginName, sliceReducerActionsBy } from '../hooks';

type AuthSSOStateMapper<S extends object> = (state: SSOState) => S;
const defaultAuthSSOStateMapper: any = (state: SSOState) => ({ ...state });
export const useAuthSSOState = <S extends object>(
  stateMapper: AuthSSOStateMapper<S> = defaultAuthSSOStateMapper
): S => {
  const ssoState = useSelector(
    ({ [pluginName]: { ssoState } }: { auth: AuthState }) => stateMapper(ssoState),
    memoEqual
  );
  return { ...ssoState };
};

export const useAuthSSOActions = (): typeof ssoActions & CaseReducerActions<typeof ssoStateReducers> => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...ssoActions,
      ...sliceReducerActionsBy(ssoStateReducers),
    },
    dispatch
  );
};
