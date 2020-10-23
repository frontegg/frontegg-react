import React, { FC, useMemo, useRef, useState } from 'react';
import { Input, Grid, SwitchToggle, FeTable as Table, TableColumnProps, Button, Icon } from '@frontegg/react-core';
import classnames from 'classnames';
import { fakeDate } from '../../consts';
import { IWebhooksData } from '../../types';
import { IntegrationsEditPanel } from './IntegrationsEditPanel';

export interface IntegrationsContentProps {
  className?: string;
  hiddenSearch?: boolean;
}

export const IntegrationsContent: FC<IntegrationsContentProps> = ({ className, hiddenSearch = false }) => {
  const [filter, setFilter] = useState<string>('');
  const [edit, setEdit] = useState<{ width: number; data: IWebhooksData } | null>(null);
  const toggleEdit = (newData: IWebhooksData, parent?: HTMLElement | Element | null) => {
    if (!parent || (edit && newData.id === edit.data.id)) {
      return setEdit(null);
    }
    const { width } = edit ? { width: edit.width } : parent.getBoundingClientRect();
    setEdit({ width, data: newData });
  };

  const columns = useMemo(() => {
    const cols: TableColumnProps<{}>[] = [
      {
        accessor: 'platform',
        Header: 'Platform',
        // @ts-ignore
        width: 90,
        // @ts-ignore
        Cell: ({ value, row, allColumns }) => (
          <div
            className='fe-integrations-platform'
            onClick={(e) => toggleEdit(row.original, e.currentTarget.parentElement)}
          >
            {value} <Icon name='right-arrow' />
          </div>
        ),
      },
      // @ts-ignore
      { accessor: 'active', Header: 'Active', Cell: ({ value }) => <SwitchToggle value={value} readOnly /> },
      // @ts-ignore
      { accessor: 'events', Header: 'Event', Cell: ({ value }) => <span className='fe-circle'>{value}</span> },
      {
        accessor: 'actions',
        // @ts-ignore
        Cell: ({ row }) => (
          <Button
            onClick={(e) => toggleEdit(row.original, e.currentTarget.parentElement?.parentElement?.firstElementChild)}
          >
            Configure
          </Button>
        ),
        // @ts-ignore
        width: 80,
      },
      // @ts-ignore
      { accessor: 'icon', Cell: () => <Icon name='more-vert' />, width: 10 },
    ];
    return edit ? cols.slice(0, 1) : cols;
  }, [edit]);

  // TODO need use the debounce it increase productivity
  const data = useMemo(() => {
    const reg = new RegExp(filter, 'i');
    return fakeDate.filter(({ platform }) => reg.test(platform));
  }, [filter]);

  return (
    <Grid container className={classnames('fe-integrations-context', className)} direction='column'>
      {!hiddenSearch && (
        <Grid item className='fe-integrations-search'>
          <Input placeholder='Search by title...' onChange={(e) => setFilter(e.target.value)} value={filter} />
        </Grid>
      )}
      <Grid item container>
        <Grid
          item
          style={edit ? { width: edit.width, flexGrow: 0 } : { flexGrow: 1 }}
          className='fe-integrations-table'
        >
          <Table rowKey='id' columns={columns} data={data} />
        </Grid>
        {edit && (
          <IntegrationsEditPanel onClose={() => setEdit(null)}>
            {React.createElement(edit.data.Form)}
          </IntegrationsEditPanel>
        )}
      </Grid>
    </Grid>
  );
};
