export declare type IUserProfile = {
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
export declare type IUpdateProfile = {
    title: 'Mr' | 'Miss' | 'Mrs' | 'Ms';
    name: string;
    country: string;
    phoneNumber: string;
    dateOfBirth: number;
    profilePicture: string;
};
export declare type IChangePassword = {
    password: string;
    newPassword: string;
};
