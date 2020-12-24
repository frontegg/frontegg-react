import React, { FC, useCallback, useLayoutEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { IWebhooksConfigurations, IWebhooksSaveData } from '@frontegg/rest-api';
import {
  Icon,
  Menu,
  useT,
  Grid,
  Table,
  Button,
  Loader,
  Dialog,
  NotFound,
  useSearch,
  useDispatch,
  useSelector,
  TableColumnProps,
} from '@frontegg/react-core';
import { IPluginState } from '../../interfaces';
import { IWebhookLocationState } from './interfaces';
import { filterCategories } from '../../utils';
import { EventsCell } from '../../elements/EventsCell';
import { connectivityActions } from '../../reducer';
import { IntegrationCheckBox } from '../../elements/IntegrationCheckBox';

interface IEventCount {
  name: string;
  count: number;
}

export const ConnectivityWebhooksList: FC = () => {
  const { t } = useT();
  const dispatch = useDispatch();
  const {
    replace: historyReplace,
    location: { state: locationState, ...location },
  } = useHistory<IWebhookLocationState>();

  const [remove, onRemove] = useState<IWebhooksConfigurations | null>(null);

  const { webhook, isSaving, categories, channelMap, isLoading } = useSelector(
    ({ connectivity: { isLoading, isSaving, webhook, categories, channelMap } }: IPluginState) => ({
      webhook,
      isSaving,
      isLoading,
      categories,
      channelMap: channelMap && channelMap.webhook,
    })
  );

  useLayoutEffect(() => {
    !isSaving && onRemove(null);
  }, [isSaving, onRemove]);

  const cleanCategory = filterCategories(categories, channelMap);

  const [data, Search] = useSearch({ filteredBy: 'displayName', data: webhook });

  const onEdit = useCallback(
    (id?: string) => {
      historyReplace({ ...location, state: { ...locationState, view: 'edit', id } });
    },
    [Location, locationState]
  );

  const onNewEvent = useCallback(() => {
    historyReplace({ ...location, state: { ...locationState, view: 'edit' } });
  }, [Location, locationState]);

  const countOfEvents = useCallback(
    (eventKeys: string[]) =>
      cleanCategory?.reduce((acc: IEventCount[], cur) => {
        const template = `${cur.name}.*`;
        return [
          ...acc,
          {
            name: cur.name,
            count: eventKeys.includes(template)
              ? cur.events?.length || 0
              : (cur.events?.filter(({ key }) => eventKeys.includes(key)) ?? []).length,
          },
        ];
      }, []) ?? [],
    [cleanCategory]
  );

  const onChangeStatus = useCallback(
    (data: IWebhooksSaveData) => {
      dispatch(connectivityActions.postDataAction('webhook', { ...data, isActive: !data.isActive }));
    },
    [dispatch]
  );

  const columns: TableColumnProps<IWebhooksConfigurations>[] = useMemo(
    () => [
      {
        accessor: 'displayName',
        Header: t('common.title').toUpperCase(),
        Cell: ({ value, row }) => (
          <div
            className='fe-connectivity-webhook-cell fe-connectivity-webhook-cell-link'
            onClick={() => onEdit(row.original._id)}
          >
            <div>{value}</div>
            {row.original.description && (
              <div className='fe-connectivity-webhook-description'>{row.original.description}</div>
            )}
          </div>
        ),
      },
      {
        accessor: 'isActive',
        Header: t('common.status').toUpperCase(),
        Cell: ({ value, row }) => <IntegrationCheckBox checked={value} onChange={() => onChangeStatus(row.original)} />,
        maxWidth: 50,
        minWidth: 50,
      },
      {
        accessor: 'eventKeys',
        Header: t('common.events').toUpperCase(),
        Cell: ({ value }) => <EventsCell events={value} />,
      },
      {
        accessor: 'invocations',
        Header: t('common.invocations').toUpperCase(),
      },
      {
        accessor: 'createdAt',
        Header: t('common.createdAt').toUpperCase(),
        Cell: ({ value }) => {
          const date = moment.utc(value).local();
          return (
            <div className='fe-connectivity-webhook-cell'>
              <div>{date.fromNow()}</div>
              <div className='fe-connectivity-webhook-description'>{date.format('D/M/YYYY hh:mm')}</div>
            </div>
          );
        },
      },
      {
        accessor: 'action',
        maxWidth: 40,
        minWidth: 50,
        Cell: ({ row }) => (
          <Menu
            className='fe-connectivity-panel-menu'
            trigger={
              <Button iconButton className='fe-connectivity-panel-menu-button'>
                <Icon name='vertical-dots' size='small' />
              </Button>
            }
            items={[
              { text: t('common.edit'), icon: <Icon name='edit' />, onClick: () => onEdit(row.original._id) },
              { text: t('common.remove'), icon: <Icon name='delete' />, onClick: () => onRemove(row.original) },
            ]}
          />
        ),
      },
    ],
    [t, onEdit, onRemove, countOfEvents, onChangeStatus]
  );

  if (isLoading) {
    return <Loader center />;
  }

  return (
    <div className='fe-connectivity-webhook-list'>
      {Search}
      <Button className='fe-connectivity-webhook-add' variant='primary' onClick={onNewEvent}>
        {t('connectivity.addNewHook')}
      </Button>
      {data.length ? (
        <Table rowKey='_id' columns={columns} data={data} totalData={webhook?.length || 0} />
      ) : (
        <NotFound />
      )}
      <Dialog header={t('connectivity.deleteWebhook')} open={!!remove} onClose={() => onRemove(null)}>
        {!!remove && (
          <>
            <div className='fe-mb-4'>{t('connectivity.queryDeleteWebhook', { name: remove?.displayName })}</div>
            <div className='fe-connectivity-webhook-dialog-action'>
              <Grid container spacing={2} justifyContent='flex-end'>
                <Grid item>
                  <Button variant='default' onClick={() => onRemove(null)}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant='danger'
                    loading={isSaving}
                    onClick={() => {
                      dispatch(connectivityActions.deleteWebhookConfigAction(remove._id));
                    }}
                  >
                    Accept
                  </Button>
                </Grid>
              </Grid>
            </div>
          </>
        )}
      </Dialog>
    </div>
  );
};
