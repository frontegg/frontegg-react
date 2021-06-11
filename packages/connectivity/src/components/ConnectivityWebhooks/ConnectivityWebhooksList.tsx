import React, { FC, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
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
  useSearch,
  // useDispatch,
  // useSelector,
  TableColumnProps,
} from '@frontegg/react-core';
// import { IPluginState } from '../../interfaces';
import { IWebhookLocationState } from './interfaces';
import { filterCategories, selectedEvents } from '../../utils';
// import { connectivityActions } from '../../reducer';
import { ConnectivityCheckBox } from '../../elements/ConnectivityCheckBox';
import { useConnectivityActions, useConnectivityState } from '@frontegg/react-hooks';

interface IEventCount {
  name: string;
  count: number;
}

interface IWebhooksFullConfigurations extends IWebhooksConfigurations {
  groupEvents: IEventCount[];
  totalEvents: number;
}

export const ConnectivityWebhooksList: FC = () => {
  const prevSaving = useRef<{ isSaving: boolean }>({ isSaving: false });
  const { t } = useT();
  // const dispatch = useDispatch();
  const {
    replace: historyReplace,
    location: { state: locationState, ...location },
  } = useHistory<IWebhookLocationState>();

  const [remove, onRemove] = useState<IWebhooksConfigurations | null>(null);

  // const { webhookState, isSaving, categories, channelMap, isLoading, processIds } = useSelector(
  //   ({ connectivity: { isLoading, isSaving, webhook, categories, channelMap, processIds } }: IPluginState) => ({
  //     webhookState: webhook,
  //     isSaving,
  //     isLoading,
  //     categories,
  //     channelMap: channelMap && channelMap.webhook,
  //     processIds,
  //   })
  // );
  const { postDataAction, deleteWebhookConfigAction } = useConnectivityActions();
  const { webhook: webhookState, isSaving, categories, channelMap, isLoading, processIds } = useConnectivityState();

  useLayoutEffect(() => {
    remove && prevSaving.current.isSaving && onRemove(null);
    prevSaving.current.isSaving = isSaving;
  }, [isSaving, onRemove, remove, prevSaving]);
  const cleanCatagories = filterCategories(categories, channelMap && channelMap.webhook);

  const preparedWebhookState = webhookState?.data ?? webhookState;
  const webhook = useMemo(
    () =>
      preparedWebhookState?.map((elm) => {
        const eventObject = selectedEvents(elm.eventKeys);
        const data = cleanCatagories?.reduce<IEventCount[]>((acc, cur) => {
          if (eventObject?.names.includes(cur.name)) {
            return [...acc, { name: cur.name, count: cur.events?.length ?? 0 }];
          } else {
            const evs = cur.events?.filter(({ key }) => eventObject?.eventKeys.includes(key));
            if (evs?.length) {
              return [...acc, { name: cur.name, count: evs.length }];
            }
          }
          return acc;
        }, []);
        return {
          ...elm,
          groupEvents: data ?? [],
          totalEvents: data?.reduce((acc, cur) => acc + (cur.count || 0), 0) ?? 0,
        };
      }),
    [webhookState, cleanCatagories]
  );

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

  const onChangeStatus = useCallback((data: IWebhooksSaveData) => {
    // dispatch(
    //   connectivityActions.postDataAction({ platform: 'webhook', data: { ...data, isActive: !data.isActive } })
    // );
    postDataAction({ platform: 'webhook', data: { ...data, isActive: !data.isActive } });
  }, []);

  const columns: TableColumnProps<IWebhooksFullConfigurations>[] = useMemo(
    () => [
      {
        accessor: 'displayName',
        Header: t('common.title').toUpperCase(),
        sortable: true,
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
        sortable: true,
        Cell: ({ value, row }) =>
          processIds.includes(row.original._id) ? (
            <Loader />
          ) : (
            <ConnectivityCheckBox value={value} onChange={() => onChangeStatus(row.original)} />
          ),
        sortType: 'basic',
        maxWidth: 70,
        minWidth: 70,
      },
      {
        accessor: 'totalEvents',
        sortable: true,
        Header: t('common.events').toUpperCase(),
        Cell: ({ value, row: { original } }) => (
          <div className='fe-connectivity-webhook-cell'>
            <div className='fe-connectivity-webhook-row'>
              {original.groupEvents &&
                !!original.groupEvents.length &&
                original.groupEvents.map(({ name, count }, idx) => (
                  <span key={idx} className='fe-connectivity-webhook-event'>
                    {name}({count})
                  </span>
                ))}
            </div>
            <div className='fe-connectivity-webhook-description'>{value} total</div>
          </div>
        ),
      },
      {
        accessor: 'invocations',
        sortable: true,
        Header: t('common.invocations').toUpperCase(),
      },
      {
        accessor: 'createdAt',
        sortable: true,
        Header: t('common.createdAt').toUpperCase(),
        Cell: ({ value }) => {
          const date = moment.utc(value).local();
          return (
            <div className='fe-connectivity-webhook-cell'>
              <div>{date.fromNow()}</div>
              <div className='fe-connectivity-webhook-description'>{date.format('D/M/YYYY hh:mm A')}</div>
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
              <Button data-test-id='menuBtn' iconButton className='fe-connectivity-panel-menu-button'>
                <Icon name='vertical-dots' size='small' />
              </Button>
            }
            items={[
              {
                text: t('common.edit'),
                icon: <Icon name='edit' />,
                onClick: () => {
                  onEdit(row.original._id);
                },
              },
              { text: t('common.remove'), icon: <Icon name='delete' />, onClick: () => onRemove(row.original) },
            ]}
          />
        ),
      },
    ],
    [t, onEdit, onRemove, onChangeStatus, processIds]
  );

  if (isLoading) {
    return <Loader center />;
  }

  return (
    <div className='fe-connectivity-webhook-list'>
      {Search}
      <Button data-test-id='addBtn' className='fe-connectivity-webhook-add' variant='primary' onClick={onNewEvent}>
        {t('connectivity.addNewHook')}
      </Button>
      <Table rowKey='_id' columns={columns as any} data={data} totalData={webhook?.length || 0} />
      <Dialog header={t('connectivity.deleteWebhook')} open={!!remove} onClose={() => onRemove(null)}>
        {!!remove && (
          <>
            <div className='fe-mb-4'>{t('connectivity.queryDeleteWebhook', { name: remove?.displayName })}</div>
            <div className='fe-connectivity-webhook-dialog-action'>
              <Grid container spacing={2} justifyContent='flex-end'>
                <Grid item>
                  <Button data-test-id='cancelBtn' variant='default' onClick={() => onRemove(null)}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    data-test-id='acceptBtn'
                    variant='danger'
                    loading={isSaving}
                    onClick={() => {
                      // dispatch(connectivityActions.deleteWebhookConfigAction(remove._id));
                      deleteWebhookConfigAction(remove._id);
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
