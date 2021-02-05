import { AuthState, teamActions, TeamState, teamReducers, TeamActions } from '@frontegg/redux-store/auth';
import { memoEqual, useDispatch, useSelector } from '@frontegg/react-core';
import { bindActionCreators } from '@reduxjs/toolkit';
import { pluginName, sliceReducerActionsBy } from '../hooks';

export type AuthTeamStateMapper<S extends object> = (state: TeamState) => S;
const defaultAuthTeamStateMapper: any = (state: TeamState) => state;

export const useAuthTeamState = <S extends object>(
  stateMapper: AuthTeamStateMapper<S> = defaultAuthTeamStateMapper
): S => {
  return useSelector(({ [pluginName]: { teamState } }: { auth: AuthState }) => stateMapper(teamState), memoEqual);
};

export const useAuthTeamActions = (): TeamActions => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...teamActions, ...sliceReducerActionsBy(teamReducers) }, dispatch);
};
