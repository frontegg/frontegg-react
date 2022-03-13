import React, { FC } from 'react';
import { useAuthUserOrNull } from '@frontegg/react-hooks';
import { User } from '@frontegg/redux-store';

export interface AuthorizationProps {
  requiredRoles?: string[];
  requiredPermissions?: string[];
  render?: (isAuthorized: boolean) => React.ReactNode | null;
}

export const AuthorizedContent: FC<AuthorizationProps> = (props) => {
  let isAuthorized = true; // Initially
  const user = useAuthUserOrNull();

  if (!user?.superUser) {
    if (props.requiredPermissions) {
      isAuthorized = false; // Reset - we are going to check that the user has at least one matching permission
      for (const permission of props.requiredPermissions) {
        if (user?.permissions?.find(({ key }) => key === permission)) {
          isAuthorized = true;
        }
      }
    }

    if (props.requiredRoles) {
      isAuthorized = false; // Reset - we are going to check that the user has at least one matching role
      for (const role of props.requiredRoles) {
        if (user?.roles?.find(({ key }) => key === role)) {
          isAuthorized = true;
        }
      }
    }
  }
  if (typeof props.render === 'function') {
    return <>{props.render(isAuthorized)}</>;
  }

  return isAuthorized ? <>{props.children}</> : null;
};
