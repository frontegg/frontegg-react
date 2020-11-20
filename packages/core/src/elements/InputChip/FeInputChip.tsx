import React, { FC } from 'react';
import { IInputChip } from './interfaces';
import { FeGrid } from '../Grid/FeGrid';
import { FeChip } from '../Chip/FeChip';
import './FeInputChip.scss';

export const FeInputChip: FC<IInputChip> = ({ chips, label, inputValue, onDelete, ...inputProps }) => (
  <div className='fe-input fe-inputChip'>
    {!!label && <div>{label}</div>}
    <FeGrid container className='fe-input__inner'>
      {chips.map((val, idx) => (
        <FeGrid item key={idx}>
          <FeChip label={val} onDelete={() => onDelete(idx)} />
        </FeGrid>
      ))}
      <FeGrid item>
        <input {...inputProps} value={inputValue} className='fe-input__input' />
      </FeGrid>
    </FeGrid>
  </div>
);
