import React, { FC, useMemo } from 'react';
import { useSelector } from '@frontegg/react-core';
import { ICategory } from '@frontegg/rest-api';
import { IPluginState } from '../interfaces';
import { filterCategories, selectedEvents } from '../utils';

export interface IEventsCell {
  events: string[];
}

export const EventsCell: FC<IEventsCell> = React.memo(({ events }) => {
  const { categories, channelMap } = useSelector(({ integrations: { categories, channelMap } }: IPluginState) => ({
    categories,
    channelMap: channelMap && channelMap.webhook,
  }));

  const eventObject = selectedEvents(events);
  const cleanCatagories = filterCategories(categories, channelMap);

  const data = useMemo(
    () =>
      cleanCatagories?.reduce((acc: ICategory[], cur: ICategory) => {
        if (eventObject?.names.includes(cur.name)) {
          return [...acc, cur];
        } else {
          const evs = cur.events?.filter(({ key }) => eventObject?.eventKeys.includes(key));
          if (evs?.length) {
            return [...acc, { ...cur, events: evs }];
          }
        }
        return acc;
      }, []),
    [eventObject, cleanCatagories]
  );

  return (
    <div className='fe-integrations-webhook-cell'>
      <div className='fe-integrations-webhook-row'>
        {data?.map(({ id, name, events }, idx) => (
          <span key={id} className='fe-integrations-webhook-event'>
            {name}({events?.length ?? 0})
          </span>
        ))}
      </div>
      <div className='fe-integrations-webhook-description'>
        {data?.reduce((acc, cur) => acc + (cur.events?.length || 0), 0)} total
      </div>
    </div>
  );
});
