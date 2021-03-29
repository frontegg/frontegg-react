import {
  rolesReducers,
  rolesActions,
  RolesActions,
  RolesState,
} from '@frontegg/redux-store/auth';
import { reducerActionsGenerator, StateHookFunction, stateHookGenerator } from './hooks';

export type RolesStateMapper<S extends object> = (state: RolesState) => S;

export const useRolesState: StateHookFunction<RolesState> = <S extends object>(
  stateMapper?: RolesStateMapper<S>,
): S => stateHookGenerator(stateMapper, 'rolesState');

export const useRolesActions = (): RolesActions => reducerActionsGenerator(rolesActions, rolesReducers);
