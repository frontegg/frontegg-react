import React, { FC, useMemo } from 'react';
import { Select, Table, TableColumnProps } from '@frontegg/react-core';
import { useAuth } from '../hooks';

export interface TeamTableProps {}

export const TeamTable: FC<TeamTableProps> = (props) => {
  const { users, loaders, totalItems, pageSize, totalPages, errors, roles } = useAuth((state) => state.teamState);

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
          return (
            <Select
              multiselect={true}
              value={value}
              options={roles.map((role) => ({ label: role.name, value: role.id }))}
              onChange={(e, values) => {
                console.log(values);
              }}
            />
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
