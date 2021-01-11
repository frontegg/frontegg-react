import React, { FC, useMemo } from 'react';
import { useSelector } from '@frontegg/react-core';
import { ICategory } from '@frontegg/rest-api';
import { IPluginState } from '../interfaces';
import { filterCategories, selectedEvents } from '../utils';

export interface IEventsCell {
  events: string[];
}

export const EventsCell: FC<IEventsCell> = React.memo(({ events }) => {
  const { categories, channelMap } = useSelector(({ connectivity: { categories, channelMap } }: IPluginState) => ({
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

  const totalEvents = useMemo(() => data?.reduce((acc, cur) => acc + (cur.events?.length || 0), 0) ?? 0, [data]);

  return (
    <div className='fe-connectivity-webhook-cell'>
      <div className='fe-connectivity-webhook-row'>
        {data && data.length ? (
          data.map(({ id, name, events }, idx) => (
            <span key={id} className='fe-connectivity-webhook-event'>
              {name}({events?.length ?? 0})
            </span>
          ))
        ) : (
          <>&nbsp;</>
        )}
      </div>
      <div className='fe-connectivity-webhook-description'>{totalEvents} total</div>
    </div>
  );
});
