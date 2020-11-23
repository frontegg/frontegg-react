import React, { FC, useRef } from 'react';
import { IInputChip } from './interfaces';
import { FeGrid } from '../Grid/FeGrid';
import { FeChip } from '../Chip/FeChip';
import './FeInputChip.scss';

export const FeInputChip: FC<IInputChip> = ({ chips, label, inputValue, onDelete, ...inputProps }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='fe-input fe-inputChip' onClick={() => inputRef.current && inputRef.current.focus()}>
      {!!label && <div>{label}</div>}
      <FeGrid container className='fe-input__inner'>
        {chips.map((val, idx) => (
          <FeGrid item key={idx} className='fe-mt-1 fe-mb-1'>
            <FeChip label={val} onDelete={() => onDelete(idx)} />
          </FeGrid>
        ))}
        <FeGrid item>
          <input {...inputProps} value={inputValue} className='fe-input__input' ref={inputRef} />
        </FeGrid>
      </FeGrid>
    </div>
  );
};
