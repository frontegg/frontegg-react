import { useAuth, useAuthTeamActions, useAuthTeamState } from '../hooks';
import { useEffect } from 'react';

export const reloadTeamIfNeeded = () => {
  const { loading, users } = useAuthTeamState(({ loaders, users }) => ({ loading: loaders.USERS, users }));
  const { loadUsers } = useAuthTeamActions();
  useEffect(() => {
    if (!loading && users.length === 0) {
      loadUsers({ pageOffset: 0 });
    }
  }, []);
};
