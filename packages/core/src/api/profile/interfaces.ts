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

export type IChangePassword = {
  password: string;
  newPassword: string;
};
