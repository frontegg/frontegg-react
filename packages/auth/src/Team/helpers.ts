import { useAuth } from '../hooks';
import { useEffect } from 'react';

export const reloadTeamIfNeeded = () => {
  const { loaders, users, loadUsers } = useAuth((state) => state.teamState);
  useEffect(() => {
    if (!loaders.USERS && users.length === 0) {
      loadUsers({ pageOffset: 0 });
    }
  }, []);
};
