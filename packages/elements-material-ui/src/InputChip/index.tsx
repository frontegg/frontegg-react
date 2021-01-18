import { IInputChip, useCombinedRefs } from '@frontegg/react-core';
import classNames from 'classnames';
import { Chip, Grid } from '@material-ui/core';
import React, { FC, forwardRef, useRef } from 'react';

import './styles.scss';

export const InputChip = forwardRef<HTMLInputElement, IInputChip>(
  ({ chips, label, onDelete, error, fullWidth, className, ...inputProps }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const refCallback = useCombinedRefs<HTMLInputElement>([ref, inputRef]);

    return (
      <div
        className={classNames('MuiChipInput', className, { 'MuiChipInput-fullWidth': fullWidth })}
        onClick={() => inputRef.current && inputRef.current.focus()}
      >
        {!!label && <div>{label}</div>}
        <Grid container alignItems='center'>
          {chips.map((chip, idx) => (
            <Grid item key={idx}>
              <Chip label={chip} onDelete={() => onDelete(idx)} />
            </Grid>
          ))}
          <Grid item>
            <input {...inputProps} ref={refCallback} />
          </Grid>
        </Grid>
        {error && <div className='MuiAlert-standardError'>{error}</div>}
      </div>
    );
  }
);
