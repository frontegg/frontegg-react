import React, { FC, useEffect, useMemo, useState } from 'react';
import { Table, TableColumnProps, useT } from '@frontegg/react-core';
import { useAuthUserOrNull } from '../hooks';
import { TeamState } from '../Api/TeamState';
import {
  TeamTableActions,
  TeamTableAvatarCell,
  TeamTableDescriptionCell,
  TeamTableJoinedTeam,
  TeamTableLastLogin,
  TeamTableTitleCell,
  TeamTableRoles,
} from './TeamTableCells';
import { ContextHolder } from '@frontegg/rest-api';
import { useAuthTeamActions, useAuthTeamState } from './hooks';

type TRoles = {
  label: string;
  value: string;
};

const stateMapper = ({ users, loaders, totalItems, pageSize, totalPages, errors, roles, sort, filter }: TeamState) => ({
  users,
  loaders,
  totalItems,
  pageSize,
  totalPages,
  errors,
  roles,
  sort,
  filter,
});

export const TeamTable: FC = (props) => {
  const [roleOptionsToDisplay, setRoleOptionsToDisplay] = useState<TRoles[]>([]);
  const { users, loaders, totalItems, sort, pageSize, totalPages, roles } = useAuthTeamState(stateMapper);
  const user = useAuthUserOrNull();
  const { loadUsers } = useAuthTeamActions();
  const { t } = useT();
  useEffect(() => {
    loadUsers({ pageOffset: 0 });
  }, []);

  useEffect(() => {
    checkRoleAccess();
  }, [roles]);

  const getRoleLevel = (roleId: string) => {
    if (!roles) return Infinity;
    const roleSettings = roles.find((role) => role.id === roleId);
    return roleSettings?.permissionLevel || Infinity;
  };

  const getMaxRoleLevel = (roleIds: string[]) => {
    if (!roleIds) return Infinity;
    // map roleIds array to numeric levels array, using provider roles settings
    const levelsArr: number[] = roleIds.map((roleId) => getRoleLevel(roleId));
    const maxRoleLevel = levelsArr.length ? Math.min(...levelsArr) : Infinity;
    return maxRoleLevel;
  };

  const checkRoleAccess = () => {
    const context = ContextHolder.getContext();
    let currnetUserRoleLevel: number;
    let currentUserRolesIds = user?.roles.map((r) => r.id);

    if (context.currentUserRoles && context.currentUserRoles.length > 0) {
      currnetUserRoleLevel = getMaxRoleLevel(context.currentUserRoles);
    } else if (currentUserRolesIds && currentUserRolesIds.length > 0) {
      currnetUserRoleLevel = getMaxRoleLevel(currentUserRolesIds);
    }

    if (roles) {
      const rolesWithAccess = roles.filter((role) => {
        return (role.permissionLevel ?? Infinity) >= currnetUserRoleLevel;
      });
      setRoleOptionsToDisplay(rolesWithAccess.map((r) => ({ label: r.name, value: r.id })));
    }
  };

  const teamTableColumns: TableColumnProps[] = useMemo(
    () => [
      {
        accessor: 'profileImage',
        minWidth: '2.25rem',
        maxWidth: '2.25rem',
        Cell: TeamTableAvatarCell,
      },
      {
        accessor: 'name',
        Header: t('common.name') ?? '',
        sortable: true,
        Cell: TeamTableTitleCell(user?.id, t('common.me')),
      },
      {
        accessor: 'email',
        Header: t('common.email') ?? '',
        sortable: true,
        Cell: TeamTableDescriptionCell,
      },
      ...(roles.length > 0
        ? [
            {
              accessor: 'roleIds',
              minWidth: 300,
              Header: t('common.roles') ?? '',
              Cell: TeamTableRoles(
                roles.map((r) => ({ label: r.name, value: r.id })),
                roleOptionsToDisplay
              ),
            },
          ]
        : []),
      {
        accessor: 'createdAt',
        Header: t('common.joinedTeam') ?? '',
        sortable: true,
        Cell: TeamTableJoinedTeam(t('common.pendingApproval')),
      },
      {
        accessor: 'lastLogin',
        Header: t('common.lastLogin') ?? '',
        sortable: true,
        Cell: TeamTableLastLogin,
      },
      {
        id: 'actions',
        minWidth: '3.25rem',
        maxWidth: '3.25rem',
        Cell: TeamTableActions(user?.id),
      },
    ],
    [roles, roleOptionsToDisplay]
  );

  return (
    <div className='fe-team__table'>
      <Table
        data={users}
        totalData={totalItems || users.length}
        columns={teamTableColumns}
        rowKey={'id'}
        pageSize={pageSize}
        pageCount={totalPages || 1}
        pagination='pages'
        loading={!!loaders.USERS}
        sortBy={sort}
        onSortChange={(sortBy) => loadUsers({ sort: sortBy, pageOffset: 0 })}
        onPageChange={(pageSize, pageOffset) => loadUsers({ pageSize, pageOffset })}
      />
    </div>
  );
};
