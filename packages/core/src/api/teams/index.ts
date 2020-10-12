import { Get, Post, Put } from '../fetch';
import Logger from '../../helpers/Logger';
import { USERS_SERVICE_URL_V1, USERS_SERVICE_URL_V2 } from '../constants';
import { IChangePassword, ITeamUser, IUpdateProfile, IUserProfile } from './interfaces';

const logger = Logger.from('ProfileApi');

/*****************************************
 * Profile Api
 *****************************************/

/**
 * change user password by providing current password and the new password.
 *
 * @throws exception if the current password incorrect or new password validation failed.
 * ``authorized user``
 */
export async function getProfile(): Promise<IUserProfile> {
  logger.debug('getProfile()');
  return Get(`${USERS_SERVICE_URL_V2}/me`);
}

/**
 * update user profile by providing updated fields.
 * ``authorized user``
 */
export async function updateProfile(body: Partial<IUpdateProfile>): Promise<IUserProfile> {
  logger.debug('updateProfile()', body);
  return Put(`${USERS_SERVICE_URL_V2}/me`, body);
}

/**
 * change user password by providing current password and the new password.
 *
 * @throws exception if the current password incorrect or new password validation failed.
 * ``authorized user``
 */
export async function changePassword(body: IChangePassword): Promise<void> {
  logger.debug('changePassword()');
  return Post(`${USERS_SERVICE_URL_V1}/passwords/change`, body);
}

/*****************************************
 * Team Api
 *****************************************/
/**
 * load team users
 *
 * ``authorized user``
 */
export async function loadUsers(): Promise<ITeamUser[]> {
  logger.debug('loadUsers()');
  return Get(`${USERS_SERVICE_URL_V1}`);
}
