import React, { FC, useEffect, useState } from 'react';
import { Icon, PageHeader } from '@frontegg/react-core';
import { useAuditsState, useAuditsActions } from '../helpers/hooks';
import { getLastUpdatedTime } from '../helpers/getLastUpdatedTime';
import { Stat } from './Stat';
import classNames from 'classnames';
import { prefixCls } from './constants';

export const AuditsHeader: FC = () => {
  const { lastUpdated, isLoading, totalToday, severeThisWeek } = useAuditsState(
    ({ lastUpdated, isLoading, totalToday, severeThisWeek }) => ({
      lastUpdated,
      isLoading,
      totalToday,
      severeThisWeek,
    })
  );
  const { startRefresh } = useAuditsActions();
  const [_, forceUpdate] = useState();
  useEffect(() => {
    const intervalId = setInterval(() => forceUpdate(undefined), 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <PageHeader
      title='Audit Logs'
      subTitle={
        <>
          Last updated {getLastUpdatedTime(lastUpdated)}
          <Icon
            name='refresh'
            onClick={startRefresh}
            className={classNames(`${prefixCls}__refresh`, {
              [`${prefixCls}__spin`]: isLoading,
            })}
          />
        </>
      }
    >
      <div className={`${prefixCls}__stats-container`}>
        <Stat stat={totalToday} statName='Total Today' iconName='calendar-today' severity='primary' />
        <Stat stat={severeThisWeek} statName='Severe This Week' iconName='flash' severity='danger' />
      </div>
    </PageHeader>
  );
};
