import { Button, CellComponent, Icon, Loader, Menu, MenuItemProps, TableCells, useT } from '@frontegg/react-core';
import React from 'react';
import { useCallback } from 'react';
import { useApiTokensActions } from '../hooks';

export const getApiTokensTableCells = (column: string): CellComponent => {
  switch (column) {
    case 'createdAt':
      return TableCells.DateAgo;
    default:
      return TableCells.Title;
  }
};

export const ApiTokensActions = (props: any): CellComponent => {
  const { clientId } = props.row.original;
  const { setApiTokensState } = useApiTokensActions();
  const { t } = useT();

  const handleDeleteUser = useCallback(() => {
    setApiTokensState({ deleteTokenDialog: { open: true, clientId } });
  }, [clientId]);

  const items: MenuItemProps[] = [
    {
      icon: <Icon name='delete' />,
      onClick: handleDeleteUser,
      text: t('auth.apiTokens.deleteModal.title'),
      iconClassName: 'fe-color-danger',
    },
  ];

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
            <Button iconButton size='small' transparent data-test-id='dots-btn'>
              <Icon name='vertical-dots' />
            </Button>
          }
        />
      )}
    </div>
  );
};
