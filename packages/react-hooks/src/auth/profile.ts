import { useEffect } from 'react';
import { profileActions, ProfileActions, profileReducers, ProfileState } from '@frontegg/redux-store/auth';
import { reducerActionsGenerator, StateHookFunction, stateHookGenerator } from './hooks';

export const reloadProfileIfNeeded = () => {
  const { loading } = useProfileState();
  const { loadProfile } = useProfileActions();
  useEffect(() => {
    !loading && loadProfile();
  }, []);
};

export type ProfileStateMapper<S extends object> = (state: ProfileState) => S;

export const useProfileState: StateHookFunction<ProfileState> = <S extends object>(
  stateMapper?: ProfileStateMapper<S>
): S => stateHookGenerator(stateMapper, 'profileState');

export const useProfileActions = (): ProfileActions => reducerActionsGenerator(profileActions, profileReducers);
