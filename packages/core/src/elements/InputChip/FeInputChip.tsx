import React, { forwardRef, useRef } from 'react';
import classNames from 'classnames';
import { IInputChip } from './interfaces';
import { FeGrid } from '../Grid/FeGrid';
import { FeChip } from '../Chip/FeChip';
import './FeInputChip.scss';
import { useCombinedRefs } from '../../hooks';

export const FeInputChip = forwardRef<HTMLInputElement, IInputChip>(
  ({ chips, label, onDelete, fullWidth, className, error, ...inputProps }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const refCallback = useCombinedRefs<HTMLInputElement>([ref, inputRef]);

    return (
      <div
        className={classNames('fe-input fe-inputChip', className, { 'fe-input-full-width': fullWidth })}
        onClick={() => inputRef.current?.focus()}
      >
        {!!label && <div>{label}</div>}
        <FeGrid container className='fe-input__inner'>
          {chips.map((val, idx) => (
            <FeGrid item key={idx} className='fe-mt-1 fe-mb-1'>
              <FeChip label={val} onDelete={() => onDelete(idx)} />
            </FeGrid>
          ))}
          <FeGrid item>
            <input {...inputProps} className='fe-input__input' ref={refCallback} />
          </FeGrid>
        </FeGrid>
        {error && <div className='fe-error'>{error}</div>}
      </div>
    );
  }
);
