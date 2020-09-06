import React, { FC, useEffect, useRef } from 'react';
import { AuthActions, AuthState } from './Api';
import { useAuth } from './hooks';

const stateMapper = ({ isAuthenticated, user }: AuthState) => ({ isAuthenticated, user });
const actionsMapper = ({ requestAuthorize }: AuthActions) => ({ requestAuthorize });

export const AuthListener: FC = () => {
  const timer = useRef<number>(0);
  const { isAuthenticated, user, requestAuthorize } = useAuth(stateMapper, actionsMapper);

  const updateSessionTimer = (firstTime: boolean = false) => {
    timer.current && clearInterval(timer.current);
    if (firstTime) {
      requestAuthorize(firstTime);
    } else {
      timer.current && clearInterval(timer.current);
      if (isAuthenticated) {
        const ttl = (user?.expiresIn || 20) * 1000 * 0.8;
        timer.current = setTimeout(() => requestAuthorize(), ttl);
      }
    }
  };
  useEffect(() => updateSessionTimer(true), []);
  useEffect(() => updateSessionTimer(), [isAuthenticated, user]);
  return null;
};
