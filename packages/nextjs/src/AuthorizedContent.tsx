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
  const user = useAuthUserOrNull() as User & { superUser?: boolean };

  if (!user.superUser) {
    if (props.requiredPermissions) {
      if (!user?.permissions || user?.permissions.length === 0) {
        isAuthorized = false;
      }

      for (const permission of props.requiredPermissions) {
        if (!user?.permissions?.find(({ key }) => key === permission)) {
          isAuthorized = false;
        }
      }
    }

    if (props.requiredRoles) {
      if (!user?.roles || user?.roles.length === 0) {
        isAuthorized = false;
      }

      for (const role of props.requiredRoles) {
        if (!user?.roles?.find(({ key }) => key === role)) {
          isAuthorized = false;
        }
      }
    }
  }

  if (typeof props.render === 'function') {
    return <>{props.render(isAuthorized)}</>;
  }

  return isAuthorized ? <>{props.children}</> : null;
};
