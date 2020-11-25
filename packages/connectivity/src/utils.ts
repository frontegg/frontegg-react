import { useMemo } from 'react';
import { ICategory, IChannelsMap } from '@frontegg/rest-api';

export const filterCategories = (
  categories?: ICategory[],
  channelMap?: IChannelsMap[]
): (ICategory & { index: number })[] | undefined =>
  useMemo(() => {
    if (categories && channelMap) {
      return categories
        .map((cat) => ({
          ...cat,
          events: cat.events?.filter(({ key }) => channelMap.some(({ key: eventKey }) => eventKey === key)),
        }))
        .filter(({ events }) => !!events?.length)
        .map((cat, index) => ({ ...cat, index }));
    }
    return undefined;
  }, [categories, channelMap]);

export const selectedEvents = (events?: string[]): { names: string[]; eventKeys: string[] } | undefined =>
  useMemo(
    () =>
      events?.reduce(
        (acc: { names: string[]; eventKeys: string[] }, curr) => {
          if (/\.\*$/.test(curr)) {
            const val = curr.replace(/\.\*$/, '');
            !acc.names.includes(val) && acc.names.push(val);
          } else if (!acc.eventKeys.includes(curr)) {
            acc.eventKeys.push(curr);
          }
          return acc;
        },
        { names: [], eventKeys: [] }
      ),
    [events]
  );
