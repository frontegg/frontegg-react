import React from 'react';
import moment from 'moment';

export {default as Logger} from './logger'
export * from './fetch'


export function omitProps<T>(props: any, keys: string[]): T {
  const newProps = { ...props };
  keys.forEach(key => {
    delete newProps[key];
  });
  return newProps as T;
}

export const formatDate = (date: string) => {
  const mDate = moment(date);
  return <>{mDate.fromNow()} <small>{mDate.format('L LT')} </small></>;
};


