import UAParser from 'ua-parser-js';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { CellComponent, Popup, TableCells } from '@frontegg/react-core';

import { AuditsTableJson } from './AuditsTableJson';
import { AuditsTableIpCell } from './AuditsTableIpCell';
import { browsers, prefixCls, sizeOfIcon } from './constants';

const AuditsTag: CellComponent = (props) => {
  return (
    <div
      className={classNames('fe-audits__severity', {
        [`${prefixCls}__severity-${props.value?.toLowerCase?.()}`]: props.value,
      })}
    >
      <span className='fe-audits__severity-dot' />
      {props.value}
    </div>
  );
};

// Logos take from the cdnjs site. The repository with the src is here https://github.com/alrra/browser-logos
const UserAgent: CellComponent = ({ value }) => {
  const browser = useMemo(() => {
    const browser = new UAParser(value).getBrowser().name;
    return browser && browsers.includes(browser?.toLowerCase() ?? '') ? browser : 'Web';
  }, [value]);

  if (!value) {
    return null;
  }

  const imgSrc = `//cdnjs.cloudflare.com/ajax/libs/browser-logos/69.0.4/${browser.toLowerCase()}/${browser.toLowerCase()}_${sizeOfIcon}x${sizeOfIcon}.png`;
  return (
    <div className={classNames('fe-audits__severity')}>
      <Popup
        action='hover'
        content={<div className={`${prefixCls}__useragent-hover`}>{value}</div>}
        trigger={<img alt={browser} src={imgSrc} />}
      />
    </div>
  );
};

export const getAuditsTableCells = (column: string): CellComponent => {
  switch (column) {
    case 'user':
      return TableCells.Title;
    case 'createdAt':
      return TableCells.DateAgo;
    case 'severity':
      return AuditsTag;
    case 'ip':
      return AuditsTableIpCell;
    case 'json':
      return AuditsTableJson;
    case 'userAgent':
      return UserAgent;
    default:
      return TableCells.Description;
  }
};
