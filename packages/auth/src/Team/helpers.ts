import { ContextHolder, ITeamUserRole } from '@frontegg/rest-api';
import { User } from '../Api';

type TRoles = {
  label: string;
  value: string;
};

const getRoleLevel = (roleId: string, roles: ITeamUserRole[]) => {
  if (!roles) return Infinity;
  const roleSettings = roles.find((role) => role.id === roleId);
  console.log(roleSettings);
  return roleSettings?.permissionLevel ?? Infinity;
};

const getMaxRoleLevel = (roleIds: string[], roles: ITeamUserRole[]) => {
  if (!roleIds) return Infinity;
  // map roleIds array to numeric levels array, using provider roles settings
  const levelsArr: number[] = roleIds.map((roleId) => getRoleLevel(roleId, roles));
  const maxRoleLevel = levelsArr.length ? Math.min(...levelsArr) : Infinity;
  return maxRoleLevel;
};

export const checkRoleAccess = (roles: ITeamUserRole[], user: User | null): TRoles[] => {
  const context = ContextHolder.getContext();
  let currnetUserRoleLevel: number;
  let currentUserRolesIds = user?.roles.map((r) => r.id);

  if (context.currentUserRoles && context.currentUserRoles.length > 0) {
    currnetUserRoleLevel = getMaxRoleLevel(context.currentUserRoles, roles);
  } else if (currentUserRolesIds && currentUserRolesIds.length > 0) {
    currnetUserRoleLevel = getMaxRoleLevel(currentUserRolesIds, roles);
  }

  if (roles) {
    const rolesWithAccess = roles.filter((role) => (role.permissionLevel ?? Infinity) >= currnetUserRoleLevel);
    return rolesWithAccess.map((r) => ({ label: r.name, value: r.id }));
  }
  return [];
};
