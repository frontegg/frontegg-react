import { QueryFilter, QuerySort } from '../interfaces';
import { IRole, IRolePermission } from '../roles/interfaces';

export type IUserProfile = {
  id: string;
  email: string;
  mfaEnrolled: boolean;
  name: string;
  phoneNumber?: string;
  profileImage?: string;
  profilePictureUrl: string;
  roles: IRole[];
  permissions: IRolePermission[];
  tenantId: string;
  tenantIds: string[];
  activatedForTenant?: boolean;
  metadata: any;
  roleIds?: string[]; // { addRoles: true } params
  verified?: boolean;
};

export type ITeamUser = {
  // info
  id: string;
  email: string;
  name: string;
  phone?: string;
  profileImage?: string;
  profileImageUrl?: string;
  // association
  tenantId: string;
  vendorId: string;
  roleIds: string[];
  activatedForTenant: boolean;

  // other
  createdAt: string;
  customData?: any;
  lastLogin?: string;
  mfaEnabled?: boolean;
};

export type ITeamUserRole = {
  id: string;
  description: string;
  key: string;
  name: string;
  permissions?: string[];
  permissionLevel?: number;
};

export type ITeamUserPermission = {
  description: string;
  fePermission: boolean;
  id: string;
  key: string;
  name: string;
  roleIds: string[];
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
};

export interface ISamlRolesGroup {
  roleIds: string[];
  group?: string;
}

export type ITeamStats = {
  totalItems: number;
  addedThisWeek: number;
  superAdmins: number;
};

// api actions

export type IUpdateProfile = {
  title: 'Mr' | 'Miss' | 'Mrs' | 'Ms';
  name: string;
  country: string;
  phoneNumber: string;
  // time since 1970
  dateOfBirth: number;
  // profile picture in base64
  profilePicture: string;
};

export type IUpdateProfileImage = {
  profileImage: string;
};

export type IChangePassword = {
  password: string;
  newPassword: string;
};

export type ILoadUsers = {
  silentLoading?: boolean;
  filter?: QueryFilter[];
  sort?: QuerySort[];
  pageOffset: number;
  pageSize?: number;
};

export type IAddUser = {
  name: string;
  email: string;
  phone?: string;
  roleIds: string[];
};

export type IDeleteUser = {
  userId: string;
};

export type IUpdateUser = Partial<ITeamUser>;

export type IResendActivationLink = {
  userId: string;
};

export type ISendResetPasswordLink = {
  userId: string;
};
