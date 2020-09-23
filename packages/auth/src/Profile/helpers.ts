import { useAuth } from '../hooks';
import { useEffect } from 'react';
import { ProfileState } from '../Api';

export const reloadProfileIfNeeded = () => {
  const { profile, loading, loadProfile } = useAuthProfile();
  useEffect(() => {
    if (!loading && !profile) {
      console.log('reloadProfileIfNeeded', loading, profile);
      loadProfile();
    }
  }, []);
};

type ProfileStateMapper<S extends object> = (state: ProfileState) => S;
export const useAuthProfile = <T extends {}>() => useAuth((state) => state.profileState);
export const useAuthProfileSelector = <T extends {}>(stateMapper: ProfileStateMapper<T>) =>
  useAuth((state) => stateMapper(state.profileState));
