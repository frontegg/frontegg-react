import React, { useCallback, useState, useEffect } from 'react';
import { Button, CellComponent, Icon, Loader, Menu, MenuItemProps, TableCells, useT } from '@frontegg/react-core';
import { api } from '@frontegg/rest-api';
import { useApiTokensActions } from '../hooks';

export const getApiTokensTableCells = (column: string): CellComponent => {
  switch (column) {
    case 'createdByUserId':
      return ApiTokensTenantCreatedBy;
    case 'createdAt':
      return TableCells.DateAgo;
    default:
      return TableCells.Title;
  }
};

type ApiTokenCreatedByState = {
  loading: boolean;
  name?: string;
};

const ApiTokensTenantCreatedBy = ({ value }: { value: string }) => {
  const { t } = useT();
  const [state, setState] = useState<ApiTokenCreatedByState>({ loading: true });
  const { name, loading } = state;

  useEffect(() => {
    api.auth
      .getUserById({ userId: value })
      .then((data) => {
        setState({ loading: false, name: data.name });
      })
      .catch((error) => {
        console.log('failed to load user', error);
        setState({ loading: false });
      });
  }, [setState]);

  return loading ? (
    <Loader size={15} />
  ) : (
    <div className='fe-table-cell__title'>{name ?? t('common.notFoundUser')}</div>
  );
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
