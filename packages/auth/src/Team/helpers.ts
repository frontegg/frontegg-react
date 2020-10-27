import { useEffect } from 'react';
import { useAuthTeamActions, useAuthTeamState } from './hooks';

export const reloadTeamIfNeeded = () => {
  const { loading, users } = useAuthTeamState(({ loaders, users }) => ({ loading: loaders.USERS, users }));
  const { loadUsers } = useAuthTeamActions();
  useEffect(() => {
    if (!loading && users.length === 0) {
      loadUsers({ pageOffset: 0 });
    }
  }, []);
};
