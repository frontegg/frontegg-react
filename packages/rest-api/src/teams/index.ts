/* tslint:disable:no-console */
import { Get, Post, Put, Delete } from '../fetch';
import {
  TEAMS_PERMISSIONS_SERVICE_URL_V1,
  TEAMS_PROFILE_SERVICE_URL,
  TEAMS_ROLES_SERVICE_URL_V1,
  TEAMS_STATS_SERVICE_URL_V1,
  TEAMS_USERS_SERVICE_URL_V1,
  USERS_SERVICE_URL_V1,
  USERS_SERVICE_URL_V2,
} from '../constants';
import {
  IAddUser,
  IChangePassword,
  ILoadUsers,
  IResendActivationLink,
  ITeamUserRole,
  ITeamStats,
  ITeamUser,
  IUpdateProfile,
  IUserProfile,
  IUpdateUser,
  IDeleteUser,
  IUpdateProfileImage,
  ITeamUserPermission,
} from './interfaces';
import { PaginationResult } from '../interfaces';

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
  console.debug('getProfile()');
  return Get(`${USERS_SERVICE_URL_V2}/me`, params ?? { addRoles: true });
}

/**
 * update user profile by providing updated fields.
 * ``authorized user``
 */
export async function updateProfile(body: Partial<IUpdateProfile>): Promise<IUserProfile> {
  console.debug('updateProfile()', body);
  return Put(`${USERS_SERVICE_URL_V2}/me`, body);
}

/**
 * update user profile image
 * ``authorized user``
 */

export async function updateProfileImage(body: FormData): Promise<string> {
  console.debug('updateProfileImage()', body);
  return Put(`${TEAMS_PROFILE_SERVICE_URL}/me/image/v1`, body, { responseType: 'plain', contentType: undefined });
}

/**
 * change user password by providing current password and the new password.
 *
 * @throws exception if the current password incorrect or new password validation failed.
 * ``authorized user``
 */
export async function changePassword(body: IChangePassword): Promise<void> {
  console.debug('changePassword()');
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
  const filters = (params.filter || []).reduce((p, n) => ({ ...p, [n.id]: n.value }), {});
  const sorts = params.sort?.length
    ? {
        sortBy: params.sort?.[0]?.id ?? 'name',
        sortDirection: params.sort?.[0]?.desc ? 'desc' : 'asc',
      }
    : null;
  return Get(TEAMS_USERS_SERVICE_URL_V1, {
    pageOffset: params.pageOffset,
    pageSize: params.pageSize,
    ...filters,
    ...sorts,
  });
}

/**
 * add user to team, invitation link will be sent to the added user.
 *
 * ``authorized user``
 */
export async function addUser(body: IAddUser): Promise<ITeamUser> {
  console.debug('addUser()', body);
  return Post(USERS_SERVICE_URL_V2, body);
}

/**
 * delete user from team, user will be deleted.
 *
 * ``authorized user``
 */
export async function deleteUser(body: IDeleteUser): Promise<ITeamUser> {
  console.debug('deleteUser()', body);
  return Delete(`${TEAMS_USERS_SERVICE_URL_V1}/${body.userId}`);
}

/**
 * edit user roles in team
 *
 * ``authorized user``
 */
export async function updateUser(body: IUpdateUser): Promise<ITeamUser> {
  console.debug('editUser()', body);
  return Put(TEAMS_USERS_SERVICE_URL_V1, body);
}

/**
 * load available roles that can be assigned to team users from team-management-service
 *
 * ``authorized user``
 */
export async function loadAvailableRoles(): Promise<ITeamUserRole[]> {
  console.debug('loadAvailableRoles()');
  return Get(TEAMS_ROLES_SERVICE_URL_V1);
}

export async function loadAvailablePermissions(): Promise<ITeamUserPermission[]> {
  console.debug('loadAvailablePermissions()');
  return Get(TEAMS_PERMISSIONS_SERVICE_URL_V1);
}

/**
 * load users stats from team-management-service
 *
 * ``authorized user``
 */
export async function loadStats(): Promise<ITeamStats> {
  console.debug('loadStats()');
  return Get(TEAMS_STATS_SERVICE_URL_V1);
}

/**
 * resend activation link to specific user
 *
 * ``authorized user``
 */
export async function resendActivationLink(body: IResendActivationLink): Promise<void> {
  console.debug('resendActivationLink()', body);
  return Post(`${TEAMS_USERS_SERVICE_URL_V1}/${body.userId}/resendActivationEmail`, {});
}
