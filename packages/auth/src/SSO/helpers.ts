import { useAuth } from '../hooks';
import { useEffect } from 'react';

export const reloadSSOIfNeeded = () => {
  const { samlConfiguration, loading, loadSSOConfigurations } = useAuth((state) => state.ssoState);
  useEffect(() => {
    if (loading && !samlConfiguration) {
      loadSSOConfigurations();
    }
  }, []);
};
