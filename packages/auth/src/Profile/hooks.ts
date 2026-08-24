import { useEffect } from 'react';
import { useProfileState, useProfileActions } from '@frontegg/react-hooks/auth';

export const reloadProfileIfNeeded = () => {
  const { loading } = useProfileState();
  const { loadProfile } = useProfileActions();
  useEffect(() => {
    !loading && loadProfile();
  }, []);
};
