import { ApiTokensActions, getApiTokensTableCells } from './components/ApiTokensTebleCell';
export const prefixCls = 'fe-api-tokens';

export const tableColumnsTenant = [
  {
    accessor: 'clientId',
    Header: 'Client Id',
    sortable: true,
    Cell: getApiTokensTableCells('clientId'),
  },
  {
    accessor: 'description',
    Header: 'Description',
    sortable: true,
    Cell: getApiTokensTableCells('Description'),
  },
  {
    accessor: 'createdByUserId',
    Header: 'Created By',
    sortable: true,
    Cell: getApiTokensTableCells('createdByUserId'),
  },
  {
    accessor: 'createdAt',
    Header: 'Created At',
    sortable: true,
    Cell: getApiTokensTableCells('createdAt'),
  },
  {
    id: 'actions',
    minWidth: '3.25rem',
    maxWidth: '3.25rem',
    Cell: ApiTokensActions,
  },
];

export const tableColumnsUser = [
  {
    accessor: 'clientId',
    Header: 'Client Id',
    sortable: true,
    Cell: getApiTokensTableCells('clientId'),
  },
  {
    accessor: 'description',
    Header: 'Description',
    sortable: true,
    Cell: getApiTokensTableCells('Description'),
  },
  {
    accessor: 'createdAt',
    Header: 'Created At',
    sortable: true,
    Cell: getApiTokensTableCells('createdAt'),
  },
  {
    id: 'actions',
    minWidth: '3.25rem',
    maxWidth: '3.25rem',
    Cell: ApiTokensActions,
  },
];
