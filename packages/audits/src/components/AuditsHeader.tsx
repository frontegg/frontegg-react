import React, { FC, useEffect, useState } from 'react';
import { Grid, Icon } from '@frontegg/react-core';
import { useAudits } from '../helpers/hooks';
import { getLastUpdatedTime } from '../helpers/getLastUpdatedTime';
import { Stat } from './Stat';
import classNames from 'classnames';
import { prefixCls } from './Audits';

export const AuditsHeader: FC = () => {
  const { lastUpdated, startLoading, isLoading, totalToday, severeThisWeek } = useAudits();

  const [_, forceUpdate] = useState();
  useEffect(() => {
    const intervalId = setInterval(() => forceUpdate(undefined), 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Grid container justifyContent='space-between' className={`${prefixCls}__header`}>
      <Grid container direction='column' alignItems='flex-start' className={`${prefixCls}__title-container`}>
        <span className={`${prefixCls}__title`}>Audit Logs</span>
        <span className={`${prefixCls}__last-updated`}>
          Last updated {getLastUpdatedTime(lastUpdated)}
          <Icon
            name='refresh'
            onClick={startLoading}
            className={classNames(`${prefixCls}__refresh`, {
              [`${prefixCls}__spin`]: isLoading,
            })}
          />
        </span>
      </Grid>
      <Grid container className={`${prefixCls}__stats-container`}>
        <Stat stat={totalToday} statName='Total Today' iconName='calendar-today' severity='primary' />
        <Stat stat={severeThisWeek} statName='Severe This Week' iconName='flash' severity='danger' />
      </Grid>
    </Grid>
  );
};
