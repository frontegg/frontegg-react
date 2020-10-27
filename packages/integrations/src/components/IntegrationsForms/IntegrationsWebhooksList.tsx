import React, { FC } from 'react';
import classnames from 'classnames';

import { FeTable as Table, IWebhooksConfigurations, TableColumnProps } from '@frontegg/react-core';

export interface IIntegrationsWebhooksList {
  data: IWebhooksConfigurations[];
}

const columns: TableColumnProps<{}>[] = [
  { accessor: 'displayName', Header: 'Title' },
  { accessor: 'eventKeys', Header: 'Events' },
  {
    accessor: 'isActive',
    Header: 'Status',
    // @ts-ignore
    Cell: ({ value }) => <div className={classnames('fe-integrations-status', { 'fe-integrations-active': value })} />,
  },
];

export const IntegrationsWebhooksList: FC<IIntegrationsWebhooksList> = ({ data }) => {
  return <Table rowKey='_id' data={data} columns={columns} />;
};
