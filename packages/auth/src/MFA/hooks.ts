import { memoEqual, useDispatch, useSelector } from '@frontegg/react-core';
import { authActions, AuthState, MfaActions, MFAState } from '@frontegg/redux-store/auth';
import { bindActionCreators } from '@reduxjs/toolkit';
import { pluginName } from '../hooks';

type AuthMfaStateMapper<S extends object> = (state: MFAState) => S;

export const useAuthMfaState = <S extends object>(stateMapper: AuthMfaStateMapper<S>): S => {
  return useSelector(({ [pluginName]: { mfaState } }: { auth: AuthState }) => stateMapper(mfaState), memoEqual);
};
export const useAuthMfaActions = (): MfaActions => {
  const dispatch = useDispatch();
  return bindActionCreators(authActions, dispatch);
};
