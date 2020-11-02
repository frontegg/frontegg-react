import { ICategory, IChannelsMap } from '@frontegg/react-core';
import { useMemo } from 'react';
import { TPlatform } from './interfaces';

export const filterCategories = (categories?: ICategory[], channelMap?: IChannelsMap[]) =>
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
