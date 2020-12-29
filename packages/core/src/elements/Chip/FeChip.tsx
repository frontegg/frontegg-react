import React, { FC } from 'react';
import classnames from 'classnames';
import { FeButton } from '../Button/FeButton';
import { IChip } from './interfaces';
import { FeIcon } from '../Icon/FeIcon';
import './FeChip.scss';

export const FeChip: FC<IChip> = ({ className, onDelete, label }) => (
  <div className={classnames('fe-chip', className)}>
    <span>{label}</span>
    {!!onDelete && (
      <FeButton iconButton className='fe-chip-delete' onClick={onDelete} transparent>
        <FeIcon name='delete' />
      </FeButton>
    )}
  </div>
);
