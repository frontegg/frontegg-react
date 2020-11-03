import React, { FC, useContext, useMemo, useState } from 'react';
import {
  Button,
  Grid,
  Icon,
  Input,
  Loader,
  SwitchToggle,
  Table,
  TableColumnProps,
  useSelector,
  useT,
} from '@frontegg/react-core';
import { IIntegrationsData, IPluginState } from '../interfaces';
import { IntegrationsPanel } from './IntegrationsPanel';
import { platformForm } from '../consts';

export const IntegrationsTable: FC = () => {
  const { t } = useT();
  const [edit, setEdit] = useState<IIntegrationsData | null>(
    null
    // {
    //   key: 'slack',
    //   id: 1,
    //   platform: '',
    //   active: true,
    //   events: 1,
    // }
  );
  const { isLoading, list } = useSelector(({ integrations: { isLoading, list } }: IPluginState) => ({
    isLoading,
    list,
  }));
  const columns: TableColumnProps<IIntegrationsData>[] = [
    {
      accessor: 'platform',
      Header: () => <span id='fe-integrations-firstColumn'>Platform </span>,
      maxWidth: 90,
      Cell: ({ value, row, allColumns }) => (
        <Button transparent fullWidth onClick={() => setEdit(row.original)}>
          <div className='fe-integrations-platform'>
            {t(value)} <Icon className='fe-integrations-platform-right-arrow' name='right-arrow' />
          </div>
        </Button>
      ),
    },
    { accessor: 'active', Header: 'Active', Cell: ({ value }) => <SwitchToggle value={value} readOnly /> },
    { accessor: 'events', Header: 'Event', Cell: ({ value }) => <span className='fe-circle'>{value}</span> },
    {
      accessor: 'actions',
      Cell: ({ row }) => (
        <Button
          className='fe-integrations-button'
          variant={row.original.active ? 'primary' : 'secondary'}
          onClick={() => setEdit(row.original)}
        >
          {row.original.active ? 'Configure' : 'Install'}
        </Button>
      ),
      maxWidth: 80,
    },
    // { accessor: 'icon', Cell: () => <Icon name='more-vert' />, maxWidth: 10 },
  ];
  const [filter, setFilter] = useState<string>('');

  const data = useMemo(() => {
    const reg = new RegExp(filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    return list.filter(({ platform }) => reg.test(platform));
  }, [filter, list]);

  return isLoading ? (
    <Loader center />
  ) : (
    <>
      <Grid container className='fe-integrations-list' direction='column'>
        <div className='fe-integrations-search'>
          <Input placeholder='Search by title...' onChange={(e) => setFilter(e.target.value)} value={filter} />
        </div>

        <div>
          <Table rowKey='id' columns={columns} data={data} totalData={list.length} />
          <IntegrationsPanel show={!!edit} onClose={() => setEdit(null)}>
            {edit && React.createElement(platformForm[edit.key], { onClose: () => setEdit(null) })}
          </IntegrationsPanel>
        </div>
      </Grid>
    </>
  );
};
