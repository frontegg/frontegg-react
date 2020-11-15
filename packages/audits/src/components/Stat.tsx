import React, { FC } from 'react';
import { Grid, Icon, IconNames } from '@frontegg/react-core';
import { prefixCls } from './Audits';
import classNames from 'classnames';

interface StatProps {
  stat: number;
  statName: string;
  iconName: IconNames;
  severity: 'primary' | 'danger';
}

export const Stat: FC<StatProps> = ({ stat, statName, iconName, severity }) => (
  <div className={`${prefixCls}__stat`}>
    <span className={`${prefixCls}__vertical-dash`} />
    <Grid container direction='column' alignItems='flex-start' justifyContent='space-around'>
      <span className={`${prefixCls}__stat-value`}>{stat}</span>
      <span className={`${prefixCls}__stat-name`}>{statName}</span>
    </Grid>
    <div className={classNames(`${prefixCls}__stat-icon`, `${prefixCls}__stat-icon__${severity}`)}>
      <Icon name={iconName} />
    </div>
  </div>
);
