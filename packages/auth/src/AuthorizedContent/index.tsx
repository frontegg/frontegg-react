import React, { FC, useEffect } from 'react';
import { Logger } from '@frontegg/react-core';
import { ContextHolder } from '@frontegg/rest-api';

export interface AuthorizationProps {
  requiredRoles?: string[];
  requiredPermissions?: string[];
}

const logger = Logger.from('AuthorizedContent');

export const AuthorizedContent: FC<AuthorizationProps> = (props: AuthorizationProps) => {

  let isAuthorized = true; // Initially
  const user = ContextHolder.getUser();

  if (props.requiredPermissions) {
    if (!user?.permissions || user?.permissions.length === 0) {
      logger.info('No permissions for user. Required permissions are - ', props.requiredPermissions);
      isAuthorized = false;
    }

    for (const permission of props.requiredPermissions) {
      if (!user?.permissions.includes(permission)) {
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
      if (!user?.roles.includes(role)) {
        logger.info(`Role ${role} is missing from the list`);
        isAuthorized = false;
      }
    }
  }
  return (
    isAuthorized ? props.children : <React.Fragment />
  )
}
