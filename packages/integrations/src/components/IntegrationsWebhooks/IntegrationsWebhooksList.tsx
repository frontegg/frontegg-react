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
import { integrationsActions } from '../../reducer';
import { IntegrationCheckBox } from '../../elements/IntegrationCheckBox';

interface IEventCount {
  name: string;
  count: number;
}

export const IntegrationsWebhooksList: FC = () => {
  const { t } = useT();
  const dispatch = useDispatch();
  const {
    replace: historyReplace,
    location: { state: locationState, ...location },
  } = useHistory<IWebhookLocationState>();

  const [remove, onRemove] = useState<IWebhooksConfigurations | null>(null);

  const { webhook, isSaving, categories, channelMap, isLoading } = useSelector(
    ({ integrations: { isLoading, isSaving, webhook, categories, channelMap } }: IPluginState) => ({
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
      dispatch(integrationsActions.postDataAction('webhook', { ...data, isActive: !data.isActive }));
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
            className='fe-integrations-webhook-cell fe-integrations-webhook-cell-link'
            onClick={() => onEdit(row.original._id)}
          >
            <div>{value}</div>
            <div className='fe-integrations-webhook-description'>{row.original.description}</div>
          </div>
        ),
      },
      {
        accessor: 'isActive',
        Header: t('common.status').toUpperCase(),
        Cell: ({ value, row }) => <IntegrationCheckBox checked={value} onChange={() => onChangeStatus(row.original)} />,
        maxWidth: 30,
      },
      {
        accessor: 'eventKeys',
        Header: t('common.events').toUpperCase(),
        Cell: ({ value }) => <EventsCell events={value} />,
      },
      {
        accessor: 'invocations',
        Header: t('common.invocations').toUpperCase(),
        Cell: ({ value }) => <div className='fe-integrations-webhook-cell'>{value || 0}</div>,
      },
      {
        accessor: 'createdAt',
        Header: t('common.createdAt').toUpperCase(),
        Cell: ({ value }) => {
          const date = moment.utc(value).local();
          return (
            <div className='fe-integrations-webhook-cell'>
              <div>{date.fromNow()}</div>
              <div className='fe-integrations-webhook-description'>{date.format('D/M/YYYY hh:mm')}</div>
            </div>
          );
        },
      },
      {
        accessor: 'action',
        maxWidth: 50,
        Cell: ({ row }) => (
          <Menu
            trigger={
              <Button iconButton>
                <Icon name='vertical-dots' size='small' />
              </Button>
            }
            items={[
              { text: t('common.edit'), icon: 'edit', onClick: () => onEdit(row.original._id) },
              { text: t('common.remove'), icon: 'delete', onClick: () => onRemove(row.original) },
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
    <div className='fe-integrations-webhook-list'>
      {Search}
      <Button className='fe-integrations-webhook-add' variant='primary' onClick={onNewEvent}>
        {t('integrations.addNewHook')}
      </Button>
      {data.length ? (
        <Table rowKey='_id' columns={columns} data={data} totalData={webhook?.length || 0} />
      ) : (
        <NotFound />
      )}
      <Dialog header={t('integrations.deleteWebhook')} open={!!remove} onClose={() => onRemove(null)}>
        {!!remove && (
          <>
            <div className='fe-mb-4'>{t('integrations.queryDeleteWebhook', { name: remove?.displayName })}</div>
            <div className='fe-integrations-webhook-dialog-action'>
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
                      dispatch(integrationsActions.deleteWebhookConfigAction(remove._id));
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
