import React, { useCallback } from 'react';
import { Grid } from '@frontegg/react-core';
import { HeaderProps } from '../Api';
import { AuditRowData } from '@frontegg/rest-api';
import classNames from 'classnames';
import { prefixCls } from './Audits';
import { AuditsTableIpCell } from './AuditsTableIpCell';
import { AuditsTableJson } from './AuditsTableJson';
import moment from 'moment';

export const renderExpandedComponent = (headersToShow: HeaderProps[]) => (data: AuditRowData) => {
  const getValue = (type: string, data: any) => {
    switch (type) {
      case 'Json':
        return <AuditsTableJson value={data}></AuditsTableJson>;
      case 'IpAddress':
        return <AuditsTableIpCell value={data} />;
      case 'Timestamp':
        return moment(data).format('LLLL');
      default:
        return data;
    }
  };

  return (
    <Grid container className={`${prefixCls}__expand-content`}>
      {headersToShow
        .filter((_) => data.hasOwnProperty(_.name))
        .map((header) => (
          <Grid key={header.name} item xs={3} className={`${prefixCls}__property`}>
            <span
              className={classNames(`${prefixCls}__vertical-dash`, {
                [`${prefixCls}__severity-background-${data.severity.toLowerCase()}`]: header.name === 'severity',
              })}
            />
            <Grid container direction='column' justifyContent='space-around'>
              <span className={`${prefixCls}__property-name`}>{header.displayName}:</span>

              <span
                className={classNames(`${prefixCls}__property-value`, {
                  [`${prefixCls}__severity-text-${data.severity.toLowerCase()}`]: header.name === 'severity',
                })}
              >
                {getValue(header.type, data[header.name])}
              </span>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};
