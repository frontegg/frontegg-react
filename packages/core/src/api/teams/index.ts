import { Post } from '../fetch';
import Logger from '../../helpers/Logger';
import { USERS_SERVICE_URL_V1 } from '../constants';
import { IChangePassword, IUpdateProfile, IUserProfile } from './interfaces';

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
  return Post(`${USERS_SERVICE_URL_V1}/passwords/change`);
}

/**
 * update user profile by providing updated fields.
 * ``authorized user``
 */
export async function updateProfile(body: Partial<IUpdateProfile>): Promise<IUserProfile> {
  logger.debug('updateProfile()', body);
  return Post(`${USERS_SERVICE_URL_V1}/passwords/change`, body);
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
