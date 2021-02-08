import { MfaActions, MFAState, mfaActions, mfaReducers } from '@frontegg/redux-store/auth';
import { reducerActionsGenerator, StateHookFunction, stateHookGenerator } from './hooks';

type AuthMfaStateMapper<S extends object> = (state: MFAState) => S;

export const useMfaState: StateHookFunction<MFAState> = <S extends object>(stateMapper?: AuthMfaStateMapper<S>): S =>
  stateHookGenerator(stateMapper, 'mfaState');

export const useMfaActions = (): MfaActions => reducerActionsGenerator(mfaActions, mfaReducers);
