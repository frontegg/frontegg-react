import { memoEqual, useDispatch, useSelector } from '@frontegg/react-core';
import { AuthState, MfaActions, MFAState, mfaActions, mfaReducers } from '@frontegg/redux-store/auth';
import { bindActionCreators } from '@reduxjs/toolkit';
import { pluginName, sliceReducerActionsBy } from '../hooks';

type AuthMfaStateMapper<S extends object> = (state: MFAState) => S;
const defaultAuthMfaStateMapper: any = (state: MFAState) => state;

export const useAuthMfaState = <S extends object>(
  stateMapper: AuthMfaStateMapper<S> = defaultAuthMfaStateMapper
): S => {
  return useSelector(({ [pluginName]: { mfaState } }: { auth: AuthState }) => stateMapper(mfaState), memoEqual);
};
export const useAuthMfaActions = (): MfaActions => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...mfaActions, ...sliceReducerActionsBy(mfaReducers) }, dispatch);
};
