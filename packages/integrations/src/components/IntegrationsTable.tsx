import React, { FC, useLayoutEffect, useState } from 'react';
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
} from '@frontegg/react-core';
import { IIntegrationsData, IPluginState, TPlatform } from '../interfaces';
import { IntegrationsPanel } from './IntegrationsPanel';
import { platformForm } from '../consts';

interface ILocationState {
  open: TPlatform;
}

export const IntegrationsTable: FC = () => {
  const { t } = useT();
  const {
    replace: historyReplace,
    location: { state: locationState, ...location },
  } = useHistory<ILocationState>();
  const [edit, setEdit] = useState<IIntegrationsData | null>(null);

  const { isLoading, list } = useSelector(({ integrations: { isLoading, list } }: IPluginState) => ({
    isLoading,
    list,
  }));
  const [data, Search] = useSearch({ data: list, filteredBy: 'platform' });

  const columns: TableColumnProps<IIntegrationsData>[] = [
    {
      accessor: 'platform',
      Header: () => <span id='fe-integrations-firstColumn'>{t('common.platform')}</span>,
      maxWidth: 90,
      Cell: ({ value, row, allColumns }) => (
        <Button
          transparent
          fullWidth
          onClick={() => {
            setEdit(row.original);
            historyReplace({ ...location, state: { open: row.original.key } });
          }}
        >
          <div className='fe-integrations-platform'>
            {t(value)} <Icon className='fe-integrations-platform-right-arrow' name='right-arrow' />
          </div>
        </Button>
      ),
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
      Cell: ({ row }) => (
        <Button
          className='fe-integrations-button'
          variant={row.original.active ? 'primary' : 'secondary'}
          onClick={() => setEdit(row.original)}
        >
          {row.original.active ? t('common.configure') : t('common.install')}
        </Button>
      ),
      maxWidth: 80,
    },
    // { accessor: 'icon', Cell: () => <Icon name='more-vert' />, maxWidth: 10 },
  ];

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
