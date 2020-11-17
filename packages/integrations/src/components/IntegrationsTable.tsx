import React, { FC, useCallback, useLayoutEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Icon,
  useT,
  Table,
  Button,
  Loader,
  NotFound,
  useSearch,
  useSelector,
  SwitchToggle,
  TableColumnProps,
  CellComponent,
} from '@frontegg/react-core';
import { IIntegrationsData, IPluginState, TPlatform } from '../interfaces';
import { IntegrationsPanel } from './IntegrationsPanel';
import { platformForm } from '../consts';
import { combineReducers } from '@reduxjs/toolkit';

interface ILocationState {
  open: TPlatform;
}

interface IData extends IIntegrationsData {
  isSelect: boolean;
}

export const IntegrationsTable: FC = () => {
  const { t } = useT();
  const {
    replace: historyReplace,
    location: { state: locationState, ...location },
  } = useHistory<ILocationState>();
  const [edit, setEdit] = useState<IData | null>(null);

  const { isLoading, list } = useSelector(({ integrations: { isLoading, list } }: IPluginState) => ({
    isLoading,
    list,
  }));
  const [integrationData, Search] = useSearch({ data: list, filteredBy: 'platform' });

  const data = useMemo(() => integrationData.map((el) => ({ ...el, isSelect: locationState?.open === el.key })), [
    integrationData,
    locationState,
  ]);

  const platformCell = useCallback(
    ({ value, row }): CellComponent<IData> => (
      <Button
        transparent
        fullWidth
        className={classnames('fe-integrations-platform', {
          'fe-integrations-active': row.original.isSelect,
        })}
        onClick={() => {
          setEdit(row.original);
          historyReplace({ ...location, state: { open: row.original.key } });
        }}
      >
        {t(value)} <Icon className='fe-integrations-platform-right-arrow' name='right-arrow' />
      </Button>
    ),
    [historyReplace, setEdit, location]
  );

  const actionCell = useCallback(
    ({ row }): CellComponent<IData> => (
      <Button
        className='fe-integrations-button'
        variant={row.original.active ? 'primary' : 'secondary'}
        onClick={() => {
          setEdit(row.original);
          historyReplace({ ...location, state: { open: row.original.key } });
        }}
      >
        {row.original.active ? t('common.configure') : t('common.install')}
      </Button>
    ),
    [historyReplace, setEdit, location]
  );

  const columns: TableColumnProps<IData>[] = useMemo(
    () => [
      {
        accessor: 'platform',
        Header: () => <span id='fe-integrations-firstColumn'>{t('common.platform')}</span>,
        maxWidth: 90,
        Cell: platformCell,
      },
      {
        accessor: 'active',
        Header: t('common.active') || '',
        Cell: ({ value }) => <SwitchToggle value={value} readOnly />,
      },
      {
        accessor: 'events',
        Header: t('common.events') || '',
        Cell: ({ value }) => <span className='fe-circle'>{value}</span>,
      },
      {
        accessor: 'actions',
        Cell: actionCell,
        maxWidth: 80,
      },
      // { accessor: 'icon', Header: locationState?.open || '', Cell: () => <Icon name='more-vert' />, maxWidth: 10 },
    ],
    [actionCell, platformCell]
  );

  useLayoutEffect(() => {
    locationState && data?.length && setEdit(data.find(({ key }) => key === locationState.open) ?? null);
  }, [locationState, data]);

  const onCloseEdit = () => {
    locationState && historyReplace(location);
    setEdit(null);
  };

  if (isLoading) {
    return <Loader center />;
  }

  return (
    <>
      <Grid container className='fe-integrations-list' direction='column'>
        {Search}

        <div>
          {data?.length ? <Table rowKey='id' columns={columns} data={data} totalData={list.length} /> : <NotFound />}
          <IntegrationsPanel show={!!edit} onClose={onCloseEdit}>
            {edit && React.createElement(platformForm[edit.key], { onClose: onCloseEdit })}
          </IntegrationsPanel>
        </div>
      </Grid>
    </>
  );
};
