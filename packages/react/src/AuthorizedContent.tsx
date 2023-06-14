import React, { FC, ReactNode } from 'react';
import { useAuthUserOrNull, useEntitlements } from '@frontegg/react-hooks';

export interface AuthorizationProps {
  requiredRoles?: string[];
  requiredPermissions?: string[];
  requiredEntitlements?: string[];
  render?: (isAuthorized: boolean) => React.ReactNode | null;
  children?: ReactNode;
}

export const AuthorizedContent: FC<AuthorizationProps> = ({
  requiredRoles,
  requiredPermissions,
  requiredEntitlements,
  render,
  children,
}) => {
  let isAuthorized = true; // Initially
  const user = useAuthUserOrNull();
  const entitlements = useEntitlements(requiredEntitlements || []);

  if (!user?.superUser) {
    if (requiredPermissions) {
      isAuthorized = false; // Reset - we are going to check that the user has at least one matching permission
      for (const permission of requiredPermissions) {
        if (user?.permissions?.find(({ key }) => key === permission)) {
          isAuthorized = true;
          break;
        }
      }
    }

    if (requiredRoles) {
      isAuthorized = false; // Reset - we are going to check that the user has at least one matching role
      for (const role of requiredRoles) {
        if (user?.roles?.find(({ key }) => key === role)) {
          isAuthorized = true;
          break;
        }
      }
    }

    if (isAuthorized && requiredEntitlements) {
      if (entitlements.some(({ isEntitled }) => !isEntitled)) {
        isAuthorized = false;
      }
    }
  }

  if (typeof render === 'function') {
    return <>{render(isAuthorized)}</>;
  }

  return isAuthorized ? <>{children}</> : null;
};
