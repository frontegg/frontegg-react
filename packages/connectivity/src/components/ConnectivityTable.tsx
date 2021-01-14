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
  useSelector,
  TableColumnProps,
  CellComponent,
} from '@frontegg/react-core';
import { IConnectivityData, IPluginState, TPlatform } from '../interfaces';
import { ConnectivityPanel } from './ConnectivityPanel';
import { platformForm } from '../consts';
import { CheckSvg } from '../elements/Svgs';

interface ILocationState {
  open: TPlatform;
}

const cssPrefix = 'fe-connectivity-platform';

interface IData extends IConnectivityData {
  isSelect: boolean;
}

export const ConnectivityTable: FC = () => {
  const { t } = useT();
  const {
    replace: historyReplace,
    location: { state: locationState, ...location },
  } = useHistory<ILocationState>();
  const [edit, setEdit] = useState<IData | null>(null);

  const { isLoading, list } = useSelector(({ connectivity: { isLoading, list } }: IPluginState) => ({
    isLoading,
    list,
  }));

  const data = useMemo(() => list.map((el) => ({ ...el, isSelect: locationState?.open === el.key })), [
    list,
    locationState,
  ]);

  const platformCell = useCallback(
    ({ value, row: { original } }): CellComponent<IData> => (
      <Button
        transparent
        fullWidth
        className={classnames(cssPrefix, {
          'fe-connectivity-active': original.isSelect,
        })}
        onClick={() => {
          setEdit(original);
          historyReplace({ ...location, state: { open: original.key } });
        }}
      >
        <div className={`${cssPrefix}-icon`}>
          <original.image />
        </div>
        {!edit && <div className={`${cssPrefix}-title`}>{t(value)}</div>}
        <Icon className={`${cssPrefix}-right-arrow`} name='right-arrow' />
      </Button>
    ),
    [historyReplace, setEdit, location, edit]
  );

  const actionCell = useCallback(
    ({ row }): CellComponent<IData> => (
      <Button
        className='fe-connectivity-button'
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
        Header: () => <span id='fe-connectivity-firstColumn'>{t('common.channels')}</span>,
        maxWidth: 90,
        Cell: platformCell,
      },
      {
        accessor: 'active',
        Header: t('common.active') || '',
        Cell: ({ value }) => (
          <CheckSvg className={classnames(`${cssPrefix}-check`, { [`${cssPrefix}-check-active`]: value })} />
        ),
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
      <Grid container className='fe-connectivity-list' direction='column'>
        <div className={classnames({ ['fe-connectivity-panel-shown']: !!edit })}>
          <Table rowKey='id' columns={columns} data={data} totalData={list.length} />
          <ConnectivityPanel show={!!edit} onClose={onCloseEdit}>
            {edit && React.createElement(platformForm[edit.key], { onClose: onCloseEdit })}
          </ConnectivityPanel>
        </div>
      </Grid>
    </>
  );
};
