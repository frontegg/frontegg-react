import {
  IRole,
  IRolePermission,
  IRolePermissionCategory,
  IAddRole,
  IDeleteRole,
  IUpdateRole,
  IAttachPermissionsToRole,
  IAttachPermissionToRoles,
} from './interfaces';
import { Delete, Get, Patch, Post, Put } from '../fetch';
import { IDENTITY_ROLES_SERVICE_URL_V1, IDENTITY_PERMISSIONS_SERVICE_URL_V1 } from '../constants';

/**
 * Gets tenant related roles
 */
export async function getRoles(): Promise<IRole> {
  console.debug('getRoles()');
  return Get(`${IDENTITY_ROLES_SERVICE_URL_V1}`);
}

/**
 * Adds tenant related roles
 * @param body: IAddRole
 */
export async function addRole(body: IAddRole): Promise<IRole> {
  console.debug('addRole()', body);
  return Post(`${IDENTITY_ROLES_SERVICE_URL_V1}`, body);
}

/**
 * Deletes role given role ID
 */
export async function deleteRole({ roleId }: IDeleteRole): Promise<void> {
  console.debug('deleteRole()', roleId);
  return Delete(`${IDENTITY_ROLES_SERVICE_URL_V1}/${roleId}`);
}

/**
 * Updates role using a given role ID and IUpdateRole object
 */
export async function updateRole({ roleId, ...body }: IUpdateRole): Promise<IRole> {
  console.debug('updateRole()', roleId, body);
  return Patch(`${IDENTITY_ROLES_SERVICE_URL_V1}/${roleId}`, body);
}

/**
 * Attaches permissions to role given a role ID
 */
export async function attachPermissionsToRole({ roleId, ...body }: IAttachPermissionsToRole): Promise<void> {
  console.debug('attachPermissionsToRole()', roleId, body);
  return Put(`${IDENTITY_ROLES_SERVICE_URL_V1}/${roleId}/permissions`, body);
}

/**
 * Gets all vendor permissions
 */
export async function getPermissions(): Promise<IRolePermission> {
  console.debug('getPermissions()');
  return Get(`${IDENTITY_PERMISSIONS_SERVICE_URL_V1}`);
}

/**
 * Associate permission to roles
 */
export async function attachPermissionToRoles({
  permissionId,
  ...body
}: IAttachPermissionToRoles): Promise<IRolePermission> {
  console.debug('attachPermissionToRoles()');
  return Put(`${IDENTITY_PERMISSIONS_SERVICE_URL_V1}/${permissionId}/roles`, body);
}

/**
 * Gets all vendor categories including the permissions
 */
export async function getPermissionCategories(): Promise<IRolePermissionCategory> {
  console.debug('getPermissionCategories()');
  return Get(`${IDENTITY_PERMISSIONS_SERVICE_URL_V1}/categories`);
}
