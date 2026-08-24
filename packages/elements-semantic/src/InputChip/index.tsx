import { IInputChip } from '@frontegg/react-core';
import classNames from 'classnames';
import React, { forwardRef, useRef } from 'react';
import { Label, Icon } from 'semantic-ui-react';
import './styles.scss';

export const InputChip = forwardRef<HTMLInputElement, IInputChip>(
  ({ chips, fullWidth, onDelete, className, ...inputProps }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
      <div
        className={classNames('input-chip', className, { fluid: fullWidth })}
        onClick={() => inputRef.current && inputRef.current.focus()}
      >
        {chips.map((chip, idx) => (
          <Label as='div' key={idx} className='chip'>
            {chip}
            {!!onDelete && <Icon name='delete' onClick={() => onDelete(idx)} />}
          </Label>
        ))}
        <input {...inputProps} ref={ref} />
      </div>
    );
  }
);
