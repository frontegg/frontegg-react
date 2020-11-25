import React from 'react';
import { CellComponent, TableCells } from '@frontegg/react-core';
import classNames from 'classnames';
import { prefixCls } from './constants';
import { AuditsTableIpCell } from './AuditsTableIpCell';
import { AuditsTableJson } from './AuditsTableJson';

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
    default:
      return TableCells.Description;
  }
};
