import { mfaActions, MFAState } from '../Api/MfaState';
import { memoEqual, useDispatch, useSelector } from '@frontegg/react-core';
import { AuthState } from '../Api';
import { bindActionCreators } from '@reduxjs/toolkit';
import { pluginName } from '../hooks';

type AuthMfaStateMapper<S extends object> = (state: MFAState) => S;
const defaultAuthMfaStateMapper: any = (state: MFAState) => ({ ...state });
export const useAuthMfaState = <S extends object>(
  stateMapper: AuthMfaStateMapper<S> = defaultAuthMfaStateMapper
): S => {
  const dispatch = useDispatch();
  const mfaState = useSelector(
    ({ [pluginName]: { mfaState } }: { auth: AuthState }) => stateMapper(mfaState),
    memoEqual
  );
  const bindedActions = bindActionCreators(mfaActions, dispatch);
  return { ...mfaState, actions: bindedActions };
};
export const useAuthMfaActions = (): typeof mfaActions => {
  const dispatch = useDispatch();
  return bindActionCreators(mfaActions, dispatch);
};
