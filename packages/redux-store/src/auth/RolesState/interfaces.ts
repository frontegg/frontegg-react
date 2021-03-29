import { WithStatus } from '../../interfaces';
import { IRole, IRolePermission, IRolePermissionCategory } from '@frontegg/rest-api';

export type RolesState = WithStatus & {
  roles: IRole[];
  permissions: IRolePermission[];
  permissionCategories: IRolePermissionCategory[];
};
