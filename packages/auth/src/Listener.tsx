import React, { FC, useEffect, useRef } from 'react';
import { AuthActions, AuthState, storeName } from './Api';
import { useAuth, useAuthActions } from './hooks';
import { ContextHolder } from '@frontegg/rest-api';
import { ListenerProps } from '@frontegg/react-core';

const stateMapper = ({ isAuthenticated, user, isLoading, routes, keepSessionAlive }: AuthState) => ({
  isAuthenticated,
  user,
  isLoading,
  routes,
  keepSessionAlive,
});

const AuthStateKey = 'fe-auth-state';

export const AuthListener: FC<ListenerProps<AuthActions>> = (props) => {
  const timer = useRef<any>(0);
  const { isAuthenticated, user, isLoading, routes, keepSessionAlive } = useAuth(stateMapper);
  const actions = useAuthActions();
  ContextHolder.setLogout(actions.logout, routes.logoutUrl);

  const updateSessionTimer = (firstTime: boolean = false) => {
    timer.current && clearInterval(timer.current);
    if (firstTime) {
      actions.requestAuthorize(firstTime);
    } else {
      if (isAuthenticated) {
        if (keepSessionAlive === true) {
          const ttl = (user?.expiresIn || 20) * 1000 * 0.8;
          timer.current = setInterval(() => actions.requestAuthorize(), ttl);
        } else {
          const ttl = (user?.expiresIn || 20) * 1000;
          timer.current = setInterval(() => actions.logout(), ttl);
        }
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
      actions.resetState();
      actions.requestAuthorize();
    });
  };
  useEffect(() => updateSessionTimer(true), []);
  useEffect(() => updateSessionTimer(), [isAuthenticated]);
  useEffect(() => updateAuthenticationOnStorage(), [isLoading, isAuthenticated]);
  useEffect(() => addStorageListener(), []);
  useEffect(() => {
    props.resolveActions?.(storeName, actions);
  }, [props.resolveActions, actions]);
  return null;
};
