import React, { FC, useEffect, useMemo } from 'react';
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
import { useAuthTeamActions, useAuthTeamState } from './hooks';

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
  const { users, loaders, totalItems, sort, pageSize, totalPages, roles } = useAuthTeamState(stateMapper);
  const user = useAuthUserOrNull();
  const { loadUsers } = useAuthTeamActions();
  const { t } = useT();
  const roleOptions = useMemo(() => roles.map((role) => ({ label: role.name, value: role.id })), [roles]);
  useEffect(() => {
    loadUsers({ pageOffset: 0 });
  }, []);

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
                user?.roles.map((r) => r.id),
                roleOptions
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
    [roles]
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
