import { ApiTokensActions, apiTokensActions, ApiTokensState, apiTokensReducers } from '@frontegg/redux-store/auth';
import { reducerActionsGenerator, StateHookFunction, stateHookGenerator } from './hooks';

export type ApiTokensStateMapper<S extends object> = (state: ApiTokensState) => S;

export const useApiTokensState: StateHookFunction<ApiTokensState> = <S extends object>(
  stateMapper?: ApiTokensStateMapper<S>
): S => stateHookGenerator(stateMapper, 'apiTokensState');

export const useApiTokensActions = (): ApiTokensActions => reducerActionsGenerator(apiTokensActions, apiTokensReducers);
