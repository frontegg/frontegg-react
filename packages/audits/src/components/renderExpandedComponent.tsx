import React from 'react';
import moment from 'moment';
import { Grid } from '@frontegg/react-core';
import { HeaderProps } from '@frontegg/redux-store';
import { AuditRowData } from '@frontegg/rest-api';
import classNames from 'classnames';
import { AuditsTableIpCell } from './AuditsTableIpCell';
import { AuditsTableJson } from './AuditsTableJson';
import { prefixCls } from './constants';

export const renderExpandedComponent = (headersToShow: HeaderProps[]) => (data: AuditRowData) => {
  const getValue = (type: string, data: any) => {
    if (!data) return 'N/A';

    switch (type) {
      case 'Json':
        return <AuditsTableJson value={data} />;
      case 'IpAddress':
        return <AuditsTableIpCell value={data} />;
      case 'Timestamp':
        return moment(data).format('dddd, LL H:mm');
      default:
        return data;
    }
  };

  return (
    <Grid container className={`${prefixCls}__expand-content`}>
      {headersToShow
        .filter((_) => data.hasOwnProperty(_.name) && data[_.name] !== undefined)
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
