import React, { FC, useCallback, useMemo } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { IWebhooksConfigurations } from '@frontegg/rest-api';
import { NotFound, SwitchToggle, Table, TableColumnProps, useSearch, useSelector } from '@frontegg/react-core';
import { IPluginState } from '../../interfaces';
import { IWebhookLocationState } from './interfaces';
import { filterCategories } from '../../utils';
import { EventsCell } from '../../elements/EventsCell';

interface IEventCount {
  name: string;
  count: number;
}

export const IntegrationsWebhooksList: FC = () => {
  const {
    replace: historyReplace,
    location: { state: locationState, ...location },
  } = useHistory<IWebhookLocationState>();

  const { webhook, categories, channelMap } = useSelector(
    ({ integrations: { webhook, categories, channelMap } }: IPluginState) => ({
      webhook,
      categories,
      channelMap: channelMap && channelMap.webhook,
    })
  );

  const cleanCategory = filterCategories(categories, channelMap);

  const [data, Search] = useSearch({ filteredBy: 'displayName', data: webhook });

  const onEdit = useCallback(
    (id?: string) => {
      historyReplace({ ...location, state: { ...locationState, view: 'edit', id } });
    },
    [Location, locationState]
  );

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

  const columns: TableColumnProps<IWebhooksConfigurations>[] = useMemo(
    () => [
      {
        accessor: 'displayName',
        Header: 'TITLE',
        Cell: ({ value, row }) => (
          <div
            className='fe-integrations-webhook-cell fe-integrations-webhook-cell-link'
            onClick={() => onEdit(row.original._id)}
          >
            <div>{value}</div>
            <div>{row.original.description}</div>
          </div>
        ),
      },
      {
        accessor: 'eventKeys',
        Header: 'EVENTS',
        Cell: ({ value }) => <EventsCell events={value} />,
      },
      {
        accessor: 'invocations',
        Header: 'INVOCATIONS',
        Cell: ({ value }) => <div className='fe-integrations-webhook-cell'>{value || 0}</div>,
      },
      {
        accessor: 'createdAt',
        Header: 'CREATED AT',
        Cell: ({ value }) => {
          const date = moment.utc(value).local();
          return (
            <div className='fe-integrations-webhook-cell'>
              <div>{date.fromNow()}</div>
              <div>{date.format('D/M/YYYY hh:mm')}</div>
            </div>
          );
        },
      },
      { accessor: 'isActive', Header: 'STATUS', Cell: ({ value }) => <SwitchToggle value={value} /> },
    ],
    [onEdit, countOfEvents]
  );

  return (
    <div>
      {Search}
      {data.length ? (
        <Table rowKey='_id' columns={columns} data={data} totalData={webhook?.length || 0} />
      ) : (
        <NotFound />
      )}
    </div>
  );
};
