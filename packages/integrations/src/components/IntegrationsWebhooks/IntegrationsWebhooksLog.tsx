import React, { FC, useCallback, useLayoutEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Button, Dialog, Grid, Table, TableColumnProps, useDispatch, useSelector, useT } from '@frontegg/react-core';
import { integrationsActions } from '../../reducer';
import { IWebhookLocationState } from './interfaces';
import { IWebhookLog } from '@frontegg/rest-api';
import { IPluginState } from '../../interfaces';

interface IWebhookData extends IWebhookLog {
  now: string;
  date: string;
  status: JSX.Element;
}

const defaultPageSize = 7;
export const IntegrationsWebhooksLog: FC = () => {
  const { t } = useT();

  const validateStatus = (status: string) => {
    const result = +status >= 200 && +status <= 399 ? 'success' : 'failed';
    return <span className={`fe-integrations-webhook-status fe-status-${result}`}>{t(`common.${result}`)}</span>;
  };

  const formatDate = (date: string) => {
    const momentDate = moment.utc(date).local();
    return { now: momentDate.fromNow(), date: momentDate.format('D/M/YYYY hh:mm') };
  };

  const dispatch = useDispatch();
  const [moreInfo, setMoreInfo] = useState<IWebhookData | null>(null);

  const { webhookLogs } = useSelector(({ integrations: { webhookLogs } }: IPluginState) => ({ webhookLogs }));

  const data = useMemo(
    () =>
      webhookLogs?.rows?.map((log) => ({
        ...log,
        ...formatDate(log.createdAt),
        status: validateStatus(log.statusCode),
      })) ?? [],
    [webhookLogs]
  );

  const columns: TableColumnProps<IWebhookData>[] = useMemo(
    () => [
      {
        accessor: 'now',
        Header: t('common.createdAt') || '',
        maxWidth: 50,
      },
      {
        accessor: 'date',
        maxWidth: 50,
      },
      {
        accessor: 'status',
        Header: t('common.status') || '',
      },
      {
        accessor: 'body',
        Cell: ({ row }) => (
          <Button transparent onClick={() => setMoreInfo(row.original)} className='fe-integrations-webhook-detail'>
            {t('common.detail').toUpperCase()}
          </Button>
        ),
        maxWidth: 50,
      },
    ],
    [t, setMoreInfo]
  );

  const { isLoading, count } = useMemo(() => webhookLogs ?? { isLoading: true, count: 0 }, [webhookLogs]);

  const {
    location: { state: locationState },
  } = useHistory<IWebhookLocationState>();

  const loadData = useCallback(
    (pageSize: number, page: number) => {
      locationState.id &&
        dispatch(integrationsActions.loadWebhookLogsAction(locationState.id, page * pageSize, pageSize));
    },
    [dispatch, locationState.id]
  );

  useLayoutEffect(() => {
    loadData(defaultPageSize, 0);
    return () => {
      dispatch(integrationsActions.cleanWebhookLogsData());
    };
  }, [dispatch, loadData]);

  return (
    <>
      <Table
        columns={columns}
        data={data}
        rowKey='id'
        totalData={count ?? 0}
        pagination='pages'
        loading={isLoading}
        pageSize={defaultPageSize}
        pageCount={((count ?? 0) / defaultPageSize) | 0 || 1}
        onPageChange={loadData}
      />
      <Dialog
        open={!!moreInfo}
        onClose={() => setMoreInfo(null)}
        className='fe-integrations-webhook-dialog-more'
        header={
          moreInfo && (
            <Grid container justifyContent='space-between' alignItems='center'>
              <Grid item>
                <h3>{t('common.logDetails')}</h3>
                {moreInfo.now} <span className='fe-integrations-webhook-dialog-more-date'>{moreInfo.date}</span>
              </Grid>
              <Grid>{moreInfo.status}</Grid>
            </Grid>
          )
        }
      >
        {moreInfo && <pre>{JSON.stringify(JSON.parse(moreInfo.body), null, 2)}</pre>}
      </Dialog>
    </>
  );
};
