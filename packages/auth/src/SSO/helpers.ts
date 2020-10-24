import { useAuth } from '../hooks';
import { useEffect } from 'react';
import { useAuthSSOActions, useAuthSSOState } from './hooks';

export const reloadSSOIfNeeded = () => {
  const { samlConfiguration, loading } = useAuthSSOState(({ samlConfiguration, loading }) => ({
    samlConfiguration,
    loading,
  }));
  const { loadSSOConfigurations } = useAuthSSOActions();
  useEffect(() => {
    if (loading && !samlConfiguration) {
      loadSSOConfigurations();
    }
  }, []);
};
