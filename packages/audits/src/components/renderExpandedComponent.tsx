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
  const d: { [key: string]: any } = {
    ...data,
    json: [
      {
        UserId: 'saoifs12312smc',
        userName: 'Max',
        longDescription: `This is a very long text
    And will not fit into one…`,
        userRole: 'admin',
      },
      {
        UserId: 's32rdamc',
        userName: 'Aviad',
        longDescription: `This is a very long text
    And will not fit into one…`,
        userRole: 'superAdmin',
      },
      {
        UserId: 'zxcas',
        userName: 'Blamama',
        longDescription: `This is a very long text
    And will not fit into one…`,
        userRole: 'superAdmin',
      },
      {
        UserId: 'dwwxcwcw',
        userName: 'Sergey',
        longDescription: `This is a very long text
    And will not fit into one`,
        userRole: 'user',
      },
      {
        UserId: 'dwwxcwcw',
        userName: 'Sergey',
        longDescription: `This is a very long text
    And will not fit into one`,
        userRole: 'user',
      },
      {
        UserId: 'dwwxcwcw',
        userName: 'Sergey',
        longDescription: `This is a very long text
    And will not fit into one`,
        userRole: 'user',
      },
      {
        UserId: 'dwwxcwcw',
        userName: 'Sergey',
        longDescription: `This is a very long text
    And will not fit into one`,
        userRole: 'user',
      },
      {
        UserId: 'dwwxcwcw',
        userName: 'Sergey',
        longDescription: `This is a very long text
    And will not fit into one`,
        userRole: 'user',
      },
      {
        UserId: 'dwwxcwcw',
        userName: 'Sergey',
        longDescription: `This is a very long text
    And will not fit into one`,
        userRole: 'user',
      },
      {
        UserId: 'dwwxcwcw',
        userName: 'Sergey',
        longDescription: `This is a very long text
    And will not fit into one`,
        userRole: 'user',
      },
      {
        UserId: 'dwwxcwcw',
        userName: 'Sergey',
        longDescription: `This is a very long text
    And will not fit into one`,
        userRole: 'user',
      },
      {
        UserId: 'dwwxcwcw',
        userName: 'Sergey',
        longDescription: `This is a very long text
    And will not fit into one`,
        userRole: 'user',
      },
      {
        UserId: 'dwwxcwcw',
        userName: 'Sergey',
        longDescription: `This is a very long text
    And will not fit into one`,
        userRole: 'user',
      },
      {
        UserId: 'dwwxcwcw',
        userName: 'Sergey',
        longDescription: `This is a very long text
    And will not fit into one`,
        userRole: 'user',
      },
      {
        UserId: 'dwwxcwcw',
        userName: 'Sergey',
        longDescription: `This is a very long text
    And will not fit into one`,
        userRole: 'user',
      },
      {
        UserId: 'dwwxcwcw',
        userName: 'Sergey',
        longDescription: `This is a very long text
    And will not fit into one`,
        userRole: 'user',
      },
      {
        UserId: 'dwwxcwcw',
        userName: 'Jack',
        longDescription: `This is a very long text
    And will not fit into one`,
        userRole: 'user',
      },
    ],
  };

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
        .filter((_) => d.hasOwnProperty(_.name))
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
                {getValue(header.type, d[header.name])}
              </span>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};
