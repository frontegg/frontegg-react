import { IChangePassword, IUpdateProfile, IUserProfile } from './interfaces';
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
/**
 * update user profile by providing updated fields.
 * ``authorized user``
 */
export declare function updateProfile(body: Partial<IUpdateProfile>): Promise<IUserProfile>;
/**
 * change user password by providing current password and the new password.
 *
 * @throws exception if the current password incorrect or new password validation failed.
 * ``authorized user``
 */
export declare function changePassword(body: IChangePassword): Promise<void>;
