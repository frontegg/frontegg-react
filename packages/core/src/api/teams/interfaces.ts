import { TableFilter, TableSort } from '../../elements/Table';

export type IUserProfile = {
  id: string;
  email: string;
  mfaEnrolled: boolean;
  name: string;
  phoneNumber: string;
  profilePictureUrl: string;
  roles: string[];
  permissions: string[];
  tenantId: string;
  tenantIds: string[];
  activatedForTenant?: boolean;
  metadata: any;
};

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

// api actions

export type IChangePassword = {
  password: string;
  newPassword: string;
};
export type ILoadUsers = {
  filter: TableFilter;
  sort: TableSort;
};
