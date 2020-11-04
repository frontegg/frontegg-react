import { useMemo } from 'react';
import { ICategory, IChannelsMap } from '@frontegg/rest-api';

export const filterCategories = (categories?: ICategory[], channelMap?: IChannelsMap[]): ICategory[] | undefined =>
  useMemo(() => {
    if (categories && channelMap) {
      return categories
        .map((cat) => ({
          ...cat,
          events: cat.events?.filter(({ key }) => channelMap.some(({ key: eventKey }) => eventKey === key)),
        }))
        .filter(({ events }) => !!events?.length);
    }
    return undefined;
  }, [categories, channelMap]);
