import React, { FC, useEffect, useRef } from 'react';
import { AuthState } from './Api';
import { useAuth } from './hooks';

const stateMapper = ({ isAuthenticated, user, isLoading }: AuthState) => ({ isAuthenticated, user, isLoading });

const AuthStateKey = 'fe-auth-state';

export const AuthListener: FC = () => {
  const timer = useRef<any>(0);
  const { isAuthenticated, user, requestAuthorize, isLoading } = useAuth(stateMapper);

  const updateSessionTimer = (firstTime: boolean = false) => {
    timer.current && clearInterval(timer.current);
    if (firstTime) {
      requestAuthorize(firstTime);
    } else {
      if (isAuthenticated) {
        const ttl = (user?.expiresIn || 20) * 1000 * 0.8;
        timer.current = setInterval(() => requestAuthorize(), ttl);
      }
    }
  };

  const updateAuthenticationOnStorage = () => {
    if (isLoading) return;
    localStorage.setItem(AuthStateKey, JSON.stringify(isAuthenticated));
  };

  const addStorageListener = () => {
    window.addEventListener('storage', (ev) => {
      if (ev.key !== AuthStateKey) return;

      const authState = JSON.parse(ev.newValue || 'false');
      if (authState === true) return;
      // Force refresh token
      requestAuthorize();
    });
  };
  useEffect(() => updateSessionTimer(true), []);
  useEffect(() => updateSessionTimer(), [isAuthenticated]);
  useEffect(() => updateAuthenticationOnStorage(), [isLoading, isAuthenticated]);
  useEffect(() => addStorageListener(), []);
  return null;
};
