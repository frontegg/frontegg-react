import { ApiTokensActions, getApiTokensTableCells } from './components/ApiTokensTebleCell';
import { TFunction } from 'i18next';
export const prefixCls = 'fe-api-tokens';

export const tableColumnsTenant = (t: TFunction) => [
  {
    accessor: 'clientId',
    Header: t('common.clientId'),
    sortable: true,
    Cell: getApiTokensTableCells('clientId'),
  },
  {
    accessor: 'description',
    Header: t('common.description'),
    sortable: true,
    Cell: getApiTokensTableCells('Description'),
  },
  {
    accessor: 'createdByUserId',
    Header: t('common.createdBy'),
    sortable: true,
    Cell: getApiTokensTableCells('createdByUserId'),
  },
  {
    accessor: 'createdAt',
    Header: t('common.createdAt'),
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

export const tableColumnsUser = (t: TFunction) => [
  {
    accessor: 'clientId',
    Header: t('common.clientId'),
    sortable: true,
    Cell: getApiTokensTableCells('clientId'),
  },
  {
    accessor: 'description',
    Header: t('common.description'),
    sortable: true,
    Cell: getApiTokensTableCells('Description'),
  },
  {
    accessor: 'createdAt',
    Header: t('common.createdAt'),
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
