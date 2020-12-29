import { IInputChip } from '@frontegg/react-core';
import classNames from 'classnames';
import { Chip, Grid } from '@material-ui/core';
import React, { FC, useRef } from 'react';

import './styles.scss';

export const InputChip: FC<IInputChip> = ({ chips, label, inputValue, onDelete, error, fullWidth, ...inputProps }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className={classNames('MuiChipInput', { 'MuiChipInput-fullWidth': fullWidth })}
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
          <input {...inputProps} value={inputValue} ref={inputRef} />
        </Grid>
      </Grid>
      {error && <div className='MuiAlert-standardError'>{error}</div>}
    </div>
  );
};
