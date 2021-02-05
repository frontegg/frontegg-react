import { ssoActions, SSOState, ssoReducers, SSOActions } from '@frontegg/redux-store/auth';
import { reducerActionsGenerator, StateHookFunction, stateHookGenerator } from '../hooks';

type AuthSSOStateMapper<S extends object> = (state: SSOState) => S;

export const useSSOState: StateHookFunction<SSOState> = <S extends object>(stateMapper?: AuthSSOStateMapper<S>): S =>
  stateHookGenerator(stateMapper, 'ssoState');

export const useSSOActions = (): SSOActions => reducerActionsGenerator(ssoActions, ssoReducers);
