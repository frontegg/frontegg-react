import React, { FC, useMemo } from 'react';
import { Select, Table, TableColumnProps, Tag } from '@frontegg/react-core';
import { useAuth, useAuthTeamState } from '../hooks';
import { TeamState } from '../Api/TeamState';

const stateMapper = ({ users, loaders, totalItems, pageSize, totalPages, errors, roles }: TeamState) => ({
  users,
  loaders,
  totalItems,
  pageSize,
  totalPages,
  errors,
  roles,
});

export const TeamTable: FC = (props) => {
  const { users, loaders, totalItems, pageSize, totalPages, errors, roles } = useAuthTeamState(stateMapper);

  const roleOptions = useMemo(() => roles.map((role) => ({ label: role.name, value: role.id })), [roles]);

  const teamTableColumns: TableColumnProps[] = useMemo(
    () => [
      {
        accessor: 'name',
        Header: 'Name',
        sortable: true,
      },
      {
        accessor: 'email',
        Header: 'Email',
        sortable: true,
      },
      {
        accessor: 'roleIds',
        Header: 'Permissions',
        Cell: ({ value }) => {
          const permissions = roleOptions.filter((role) => value.indexOf(role.value) !== -1) || [];
          return (
            <>
              {permissions.map((permission) => (
                <Tag variant='primary' key={permission.value}>
                  {permission.label}
                </Tag>
              ))}
            </>
          );
        },
      },
    ],
    [roles]
  );

  return (
    <div className='fe-team__table'>
      <Table
        data={users}
        columns={teamTableColumns}
        rowKey={'id'}
        pageSize={pageSize}
        pageCount={totalPages || 1}
        pagination='pages'
        loading={!!loaders.USERS}
      />
    </div>
  );
};
