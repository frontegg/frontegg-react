import { teamActions, TeamState, teamReducers, TeamActions } from '@frontegg/redux-store/auth';
import { reducerActionsGenerator, StateHookFunction, stateHookGenerator } from './hooks';

export type AuthTeamStateMapper<S extends object> = (state: TeamState) => S;

export const useAuthTeamState: StateHookFunction<TeamState> = <S extends object>(
  stateMapper?: AuthTeamStateMapper<S>
): S => stateHookGenerator(stateMapper, 'teamState');

export const useAuthTeamActions = (): TeamActions => reducerActionsGenerator(teamActions, teamReducers);
