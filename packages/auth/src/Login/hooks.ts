import { LoginState, loginReducers, loginActions, LoginActions } from '@frontegg/redux-store/auth';
import { reducerActionsGenerator, StateHookFunction, stateHookGenerator } from '../hooks';

export type LoginStateMapper<S extends object> = (state: LoginState) => S;

export const useLoginState: StateHookFunction<LoginState> = <S extends object>(stateMapper?: LoginStateMapper<S>): S =>
  stateHookGenerator(stateMapper, 'loginState');

export const useLoginActions = (): LoginActions => reducerActionsGenerator(loginActions, loginReducers);
