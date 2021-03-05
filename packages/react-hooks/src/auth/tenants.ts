import { TenantsState, tenantsActions, TenantsActions, tenantsReducers } from '@frontegg/redux-store/auth';
import { reducerActionsGenerator, StateHookFunction, stateHookGenerator } from './hooks';

export type TenantsStateMapper<S extends object> = (state: TenantsState) => S;

export const useTenantsState: StateHookFunction<TenantsState> = <S extends object>(
  stateMapper?: TenantsStateMapper<S>
): S => stateHookGenerator(stateMapper, 'tenantsState');

export const useTenantsActions = (): TenantsActions => reducerActionsGenerator(tenantsActions, tenantsReducers);
