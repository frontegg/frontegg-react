import React, { FC, useMemo, useState } from 'react';
import { Input, Grid, SwitchToggle, FeTable as Table, TableColumnProps, Button, Icon } from '@frontegg/react-core';
import classnames from 'classnames';
import { fakeDate } from '../../consts';

export interface IntegrationsContentProps {
  className?: string;
  hiddenSearch?: boolean;
}

export const IntegrationsContent: FC<IntegrationsContentProps> = ({ className, hiddenSearch = false }) => {
  const columns: TableColumnProps<{}>[] = [
    {
      accessor: 'platform',
      Header: 'Platform',
      // @ts-ignore
      Cell: ({ value }, idx) => (
        <Button asLink>
          {value} <Icon name='right-arrow' />
        </Button>
      ),
    },
    { accessor: 'category', Header: 'Category' },
    // @ts-ignore
    { accessor: 'active', Header: 'Active', Cell: ({ value }) => <SwitchToggle value={value} readOnly /> },
    // @ts-ignore
    { accessor: 'events', Header: 'Event', Cell: ({ value }) => <span className='fe-circle'>{value}</span> },
    // @ts-ignore
    { accessor: 'actions', Cell: () => <Button>Configure</Button>, width: 80 },
    // @ts-ignore
    { accessor: 'icon', Cell: () => <Icon name='more-vert' />, width: 10 },
  ];

  const [filter, setFilter] = useState<string>('');

  // TODO use debounce it increase productivity
  const data = useMemo(() => {
    const reg = new RegExp(filter, 'i');
    return fakeDate.filter(({ platform }) => reg.test(platform));
  }, [filter]);

  return (
    <Grid container className={classnames('fe-webhooks-context', className)} direction='column'>
      {!hiddenSearch && (
        <Grid item className='fe-webhooks-search'>
          <Input placeholder='Search by title...' onChange={(e) => setFilter(e.target.value)} value={filter} />
        </Grid>
      )}
      <Grid item container>
        <Table rowKey='id' columns={columns} data={data} />
      </Grid>
    </Grid>
  );
};
