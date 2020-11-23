import React, { FC, useEffect, useState } from 'react';
import { Icon, PageHeader } from '@frontegg/react-core';
import { useAudits, useAuditsActions } from '../helpers/hooks';
import { getLastUpdatedTime } from '../helpers/getLastUpdatedTime';
import { Stat } from './Stat';
import classNames from 'classnames';
import { prefixCls } from './Audits';

export const AuditsHeader: FC = () => {
  const { lastUpdated, isLoading, totalToday, severeThisWeek } = useAudits();
  const { startLoading } = useAuditsActions()
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
            onClick={startLoading}
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
