import { Get, Post, Put } from '../fetch';
import Logger from '../../helpers/Logger';
import { TEAMS_SERVICE_URL_V1, USERS_SERVICE_URL_V1, USERS_SERVICE_URL_V2 } from '../constants';
import {
  IAddUser,
  IChangePassword,
  ILoadUsers,
  IResendActivationLink,
  ISendResetPassword,
  ITeamUserRole,
  ITeamStats,
  ITeamUser,
  IUpdateProfile,
  IUserProfile,
} from './interfaces';
import { PaginationResult } from '../interfaces';

const logger = Logger.from('TeamsApi');

/*****************************************
 * Profile Api
 *****************************************/

/**
 * change user password by providing current password and the new password.
 *
 * @throws exception if the current password incorrect or new password validation failed.
 * ``authorized user``
 */
export async function getProfile(params?: object): Promise<IUserProfile> {
  logger.debug('getProfile()');
  return Get(`${USERS_SERVICE_URL_V2}/me`, params ?? { addRoles: true });
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
 * load users from team-management-service
 *
 * ``authorized user``
 */
export async function loadUsers(params: ILoadUsers): Promise<PaginationResult<ITeamUser>> {
  logger.debug('loadUsers()', params);
  return Get(`${TEAMS_SERVICE_URL_V1}`, params);
}

/**
 * add user to team, invitation link will be sent to the added user.
 *
 * ``authorized user``
 */
export async function addUser(body: IAddUser): Promise<ITeamUser> {
  logger.debug('addUser()', body);
  return Post(`${TEAMS_SERVICE_URL_V1}`, body);
}

/**
 * load available roles that can be assigned to team users from team-management-service
 *
 * ``authorized user``
 */
export async function loadAvailableRoles(): Promise<ITeamUserRole[]> {
  logger.debug('loadAvailableRoles()');
  return Get(`${TEAMS_SERVICE_URL_V1}/roles`);
}

/**
 * load users stats from team-management-service
 *
 * ``authorized user``
 */
export async function loadStats(): Promise<ITeamStats> {
  logger.debug('loadStats()');
  return Get(`${TEAMS_SERVICE_URL_V1}/stats`);
}

/**
 * resend activation link to specific user
 *
 * ``authorized user``
 */
export async function resendActivationLink(body: IResendActivationLink): Promise<void> {
  logger.debug('resendActivationLink()', body);
  return Post(`${TEAMS_SERVICE_URL_V1}/resendActivationEmail`, body);
}

/**
 * reset password for a specific user
 *
 * ``authorized user``
 */
export async function resetUserPassword(body: ISendResetPassword): Promise<void> {
  logger.debug('resetUserPassword()', body);
  return Post(`${TEAMS_SERVICE_URL_V1}/sendResetPassword`, body);
}
