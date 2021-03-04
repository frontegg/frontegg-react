import React, { FC } from 'react';
import { Logger } from '@frontegg/react-core';
import { useAuthUserOrNull } from '@frontegg/react-hooks/auth';

export interface AuthorizationProps {
  requiredRoles?: string[];
  requiredPermissions?: string[];
  render?: (isAuthorized: boolean) => React.ReactNode | null;
}

const logger = Logger.from('AuthorizedContent');

export const AuthorizedContent: FC<AuthorizationProps> = (props) => {
  let isAuthorized = true; // Initially
  const user = useAuthUserOrNull();

  if (props.requiredPermissions) {
    if (!user?.permissions || user?.permissions.length === 0) {
      logger.info('No permissions for user. Required permissions are - ', props.requiredPermissions);
      isAuthorized = false;
    }

    for (const permission of props.requiredPermissions) {
      if (!user?.permissions?.find(({ key }) => key === permission)) {
        logger.info(`Permissions ${permission} is missing from the list`);
        isAuthorized = false;
      }
    }
  }

  if (props.requiredRoles) {
    if (!user?.roles || user?.roles.length === 0) {
      logger.info('No roles for user. Required roles are - ', props.requiredRoles);
      isAuthorized = false;
    }

    for (const role of props.requiredRoles) {
      if (!user?.roles?.find(({ key }) => key === role)) {
        logger.info(`Role ${role} is missing from the list`);
        isAuthorized = false;
      }
    }
  }

  if (typeof props.render === 'function') {
    return <>{props.render(isAuthorized)}</>;
  }

  return isAuthorized ? <>{props.children}</> : null;
};
