import React from 'react';
import { CellComponent, TableCells } from '@frontegg/react-core';
import classNames from 'classnames';
import { prefixCls } from './Audits';
import { AuditsTableIpCell } from './AuditsTableIpCell';

const AuditsTag: CellComponent = (props) => {
  return (
    <div
      className={classNames('fe-audits__severity', {
        [`${prefixCls}__severity-${props.value?.toLowerCase?.()}`]: props.value,
      })}>
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
    default:
      return TableCells.Description;
  }
};
