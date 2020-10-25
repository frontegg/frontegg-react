import { Button, CellComponent, Icon, Loader, Menu, MenuItemProps, TableCells, Tag, useT } from '@frontegg/react-core';
import React, { useCallback } from 'react';
import { useAuthTeamActions, useAuthTeamState } from './hooks';

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
      icon: 'send',
      onClick: handleSendActivationLink,
      text: t('auth.team.resendActivation'),
    });
  }
  if (!isMe || LEAVE_TEAM_OPTION) {
    items.push({
      icon: 'delete',
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
            <Button iconButton size='small'>
              {loading === userId ? <Loader size={24} /> : <Icon name='vertical-dots' />}
            </Button>
          }
        />
      )}
    </div>
  );
};
