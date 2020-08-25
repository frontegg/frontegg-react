/*****************************************
 * Profile Api
 *****************************************/
/**
 * change user password by providing current password and the new password.
 *
 * @throws exception if the current password incorrect or new password validation failed.
 * ``authorized user``
 */
export declare function getProfile(): Promise<IUserProfile>;
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
/**
 * update user profile by providing updated fields.
 * ``authorized user``
 */
export declare function updateProfile(body: Partial<IUpdateProfile>): Promise<IUserProfile>;
export declare type IUpdateProfile = {
    title: 'Mr' | 'Miss' | 'Mrs' | 'Ms';
    name: string;
    country: string;
    phoneNumber: string;
    dateOfBirth: number;
    profilePicture: string;
};
/**
 * change user password by providing current password and the new password.
 *
 * @throws exception if the current password incorrect or new password validation failed.
 * ``authorized user``
 */
export declare function changePassword(body: IChangePassword): Promise<void>;
export declare type IChangePassword = {
    password: string;
    newPassword: string;
};
