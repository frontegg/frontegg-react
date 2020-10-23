import React, { FC, useMemo } from 'react';
import { Table, TableColumnProps, Tag, useT, Popup, Button, Grid, Icon, CellComponent } from '@frontegg/react-core';
import { useAuthTeamActions, useAuthTeamState } from '../hooks';
import { TeamState } from '../Api/TeamState';
import { TeamRolesFilter } from './TeamTableFilters';
import {
  TeamTableDescriptionCell,
  TeamTableJoinedTeam,
  TeamTableLastLogin,
  TeamTableTitleCell,
} from './TeamTableCells';

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

const Options: CellComponent = (props) => {
  const { resendActivationLink } = useAuthTeamActions();
  return (
    <Popup
      trigger={
        <Button iconButton>
          <Icon name='vertical-dots' />
        </Button>
      }
      action='click'
      content={() => (
        <Grid container direction='column'>
          <Button
            onClick={() => {
              resendActivationLink({ userId: props.row.original.id });
            }}
          >
            Resend Activation
          </Button>
          <Button>Delete User</Button>
        </Grid>
      )}
    />
  );
};

export const TeamTable: FC = (props) => {
  const { users, loaders, totalItems, sort, filter, pageSize, totalPages, errors, roles } = useAuthTeamState(
    stateMapper
  );
  const { loadUsers } = useAuthTeamActions();
  const { t } = useT();
  const roleOptions = useMemo(() => roles.map((role) => ({ label: role.name, value: role.id })), [roles]);

  const teamTableColumns: TableColumnProps[] = useMemo(
    () => [
      {
        accessor: 'profileImage',
        minWidth: '2.25rem',
        maxWidth: '2.25rem',
        Cell: ({ value }) => {
          return <img className='fe-team__profile-img' src={value} alt='Profile Image' />;
        },
      },
      {
        accessor: 'name',
        Header: t('common.name') ?? '',
        sortable: true,
        Cell: TeamTableTitleCell,
      },
      {
        accessor: 'email',
        Header: t('common.email') ?? '',
        sortable: true,
        Cell: TeamTableDescriptionCell,
      },
      {
        accessor: 'roleIds',
        Header: t('common.permissions') ?? '',
        Cell: ({
          value,
          row: {
            original: { id },
          },
        }) => {
          const permissions = roleOptions.filter((role) => value.indexOf(role.value) !== -1) || [];
          return (
            <>
              {permissions.map((permission) => (
                <Tag className='fe-mr-1' key={permission.value}>
                  {permission.label}
                </Tag>
              ))}
              {loaders.UPDATE_USER === id}
            </>
          );
        },
        Filter: TeamRolesFilter,
      },
      {
        accessor: 'createdAt',
        Header: t('common.joined-team') ?? '',
        sortable: true,
        Cell: TeamTableJoinedTeam,
      },
      {
        accessor: 'lastLogin',
        Header: t('common.last-login') ?? '',
        sortable: true,
        Cell: TeamTableLastLogin,
      },
      {
        id: 'options',
        accessor: 'userId',
        minWidth: '2.25rem',
        maxWidth: '2.25rem',
        Header: '',
        sortable: false,
        Cell: Options,
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
        sortBy={sort}
        onSortChange={(sortBy) => loadUsers({ sort: sortBy, pageOffset: 0 })}
      />
    </div>
  );
};
