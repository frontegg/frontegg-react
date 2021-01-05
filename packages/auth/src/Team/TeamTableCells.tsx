import {
  Button,
  CellComponent,
  Checkbox,
  Icon,
  Loader,
  Menu,
  MenuItem,
  MenuItemProps,
  Popup,
  TableCells,
  Tag,
  useT,
} from '@frontegg/react-core';
import React, { useCallback } from 'react';
import { useAuthTeamActions, useAuthTeamState } from './hooks';
import classNames from 'classnames';

const LEAVE_TEAM_OPTION = false;

export const TeamTableAvatarCell: CellComponent = TableCells.Avatar;
export const TeamTableTitleCell = (me?: string, meText?: string): CellComponent => (props) => {
  const value = `${props.value} ${props.row.original.id === me ? meText : ''}`;
  return <TableCells.Title {...props} value={value} />;
};
export const TeamTableDescriptionCell: CellComponent = TableCells.Description;
export const TeamTableJoinedTeam = (pendingText: string): CellComponent => (props) => {
  const {
    row: {
      original: { lastLogin },
    },
  } = props;
  if (lastLogin) {
    return <TableCells.DateAgo {...props} />;
  } else {
    return (
      <Tag variant='primary' size='small'>
        {pendingText}
      </Tag>
    );
  }
};
export const TeamTableLastLogin: CellComponent = TableCells.DateAgo;

export const TeamTableActions = (me?: string): CellComponent => (props) => {
  const { id: userId, email, lastLogin } = props.row.original;
  const { resendActivationLink, openDeleteUserDialog } = useAuthTeamActions();
  const { loading } = useAuthTeamState((state) => ({
    loading: state.loaders.RESEND_ACTIVATE_LINK || state.loaders.UPDATE_USER || state.loaders.DELETE_USER,
  }));
  const { t } = useT();
  const isMe = me === userId;

  const handleSendActivationLink = useCallback(() => {
    resendActivationLink({ userId });
  }, [userId]);

  const handleDeleteUser = useCallback(() => {
    openDeleteUserDialog({ userId, email });
  }, [userId, email]);

  const items: MenuItemProps[] = [];

  if (!lastLogin) {
    items.push({
      icon: <Icon name='send' />,
      onClick: handleSendActivationLink,
      text: t('auth.team.resendActivation'),
    });
  }
  if (!isMe || LEAVE_TEAM_OPTION) {
    items.push({
      icon: <Icon name='delete' />,
      onClick: handleDeleteUser,
      text: isMe ? t('auth.team.leaveTeam') : t('auth.team.deleteUser'),
      iconClassName: 'fe-color-danger',
    });
  }

  return (
    <div
      style={{
        minWidth: props.column.minWidth,
        maxWidth: props.column.maxWidth,
      }}
    >
      {items.length > 0 && (
        <Menu
          items={items}
          trigger={
            <Button iconButton size='small' transparent>
              {loading === userId ? <Loader size={24} /> : <Icon name='vertical-dots' data-test-id='dots-btn' />}
            </Button>
          }
        />
      )}
    </div>
  );
};

type TRoles = {
  label: string;
  value: string;
};

export const TeamTableRoles = (allRolesOptions?: TRoles[], roleOptionsToDisplay?: TRoles[]): CellComponent => (
  props
) => {
  const { id: userId } = props.row.original;
  const { updateUser } = useAuthTeamActions();
  const { loading } = useAuthTeamState(({ loaders }) => ({
    loading: loaders.UPDATE_USER,
  }));
  const permissions = allRolesOptions?.filter((role) => props.value.indexOf(role.value) !== -1) || [];

  const checked = useCallback((role) => permissions?.some((p) => p.value === role.value), [permissions]);
  const onUpdateUser = useCallback(
    (role: TRoles) => {
      const { createdAt, customData, lastLogin, tenantId, vendorId, activatedForTenant, ...data } = props.row.original;
      updateUser({
        ...data,
        roleIds: checked(role)
          ? [...props.row.original.roleIds.filter((r: string) => r !== role.value)]
          : [...props.row.original.roleIds, role.value],
      });
    },
    [props.row.original]
  );

  return (
    <div className='fe-flex fe-full-width fe-flex-no-wrap'>
      <div className='fe-flex'>
        {permissions.map((permission) => (
          <Tag className='fe-mr-1 fe-mb-1 fe-mt-1' size='small' key={permission.value}>
            {permission.label}
          </Tag>
        ))}
      </div>
      <div className='fe-flex-spacer' />
      {!!roleOptionsToDisplay?.length && (
        <Popup
          className='fe-team__roles-popup'
          content={() => (
            <div
              className={classNames('fe-team__roles-dropdown', {
                'fe-team__roles-dropdown-disabled': loading === userId,
              })}
            >
              {roleOptionsToDisplay?.map((role) => (
                <MenuItem
                  key={role.label}
                  withIcons={true}
                  icon={<Checkbox checked={checked(role)} />}
                  onClick={loading === userId ? undefined : () => onUpdateUser(role)}
                  text={role.label}
                />
              ))}
            </div>
          )}
          action='click'
          trigger={
            <Button
              className='fe-team__roles-dropdown-button'
              transparent
              size='small'
              iconButton
              data-test-id='rolesDropDown-btn'
            >
              <Icon name='down-arrow' />
            </Button>
          }
        />
      )}
    </div>
  );
};
