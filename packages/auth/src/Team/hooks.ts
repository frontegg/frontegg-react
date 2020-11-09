import { teamActions, TeamState, teamStateReducers } from '../Api/TeamState';
import { memoEqual, useDispatch, useSelector } from '@frontegg/react-core';
import { AuthState } from '../Api';
import { bindActionCreators, CaseReducerActions } from '@reduxjs/toolkit';
import { pluginName, sliceReducerActionsBy } from '../hooks';

export type AuthTeamStateMapper<S extends object> = (state: TeamState) => S;
const defaultAuthTeamStateMapper: any = (state: TeamState) => ({ ...state });

export const useAuthTeamState = <S extends object>(
  stateMapper: AuthTeamStateMapper<S> = defaultAuthTeamStateMapper
): S => {
  return useSelector(({ [pluginName]: { teamState } }: { auth: AuthState }) => stateMapper(teamState), memoEqual);
};

export const useAuthTeamActions = (): typeof teamActions & CaseReducerActions<typeof teamStateReducers> => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...teamActions,
      ...sliceReducerActionsBy(teamStateReducers),
    },
    dispatch
  );
};
