import { Button, CellComponent, Icon, Loader, Menu, MenuItemProps, TableCells, useT } from '@frontegg/react-core';
import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { useApiTokensActions } from '../hooks';
import { api } from '@frontegg/rest-api';

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

const ApiTokensTenantCreatedBy = ({ value }: { value: string }) => {
  const { t } = useT();
  const [state, setState] = useState({
    loading: false,
    data: {
      name: '',
    },
  });
  const { data, loading } = state;

  useEffect(() => {
    loadTenantApiTokenCreator();
  }, []);

  const loadTenantApiTokenCreator = async () => {
    try {
      setState({ ...state, loading: true });
      const data = await api.auth.getUserById({ userId: value });
      setState({ data, loading: false });
    } catch (e) {
      console.log('failed to load user', e);
      setState({ data, loading: false });
    }
  };

  return loading ? (
    <Loader size={15} />
  ) : (
    <div className='fe-table-cell__title'>{data.name ?? t('common.notFound')}</div>
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
