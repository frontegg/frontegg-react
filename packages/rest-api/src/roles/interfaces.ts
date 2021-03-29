export type IRole = {
  id: string;
  key: string;
  isDefault: boolean;
  name: string;
  description?: null;
  permissions: string[];
  tenantId?: string;
  vendorId: string;
  createdAt: Date;
  updatedAt: Date;
};
export type IRolePermission = {
  id: string;
  key: string;
  name: string;
  description?: string;
  categoryId: string;
  fePermission: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type IRolePermissionCategory = {
  id: string;
  name: string;
  description: string;
  feCategory: boolean;
  permissionIds: string[];
  createdAt: Date;
  updatedAt: Date;
};


export type IAddRole = {
  key: string;
  name: string;
  description: string;
  isDefault: boolean;
  level: number;
  permissions: string[];
};

export type IUpdateRole = {
  roleId: string;
  key?: string;
  name?: string;
  description?: string;
  isDefault?: boolean;
  level?: number;
};

export type IDeleteRole = {
  roleId: string;
};

export type IAttachPermissionsToRole = {
  roleId: string;
  permissionIds: string[];
};

export type IAttachPermissionToRoles = {
  permissionId: string;
  roleIds: string[];
};
