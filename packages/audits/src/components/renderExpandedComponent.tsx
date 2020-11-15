import React from 'react';
import { Grid } from '@frontegg/react-core';
import { HeaderProps } from '../Api';
import { AuditRowData } from '@frontegg/rest-api';
import classNames from 'classnames';
import { prefixCls } from './Audits';

export const renderExpandedComponent = (headersToShow: HeaderProps[]) => (data: AuditRowData) => {
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
                {data[header.name]}
              </span>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};
