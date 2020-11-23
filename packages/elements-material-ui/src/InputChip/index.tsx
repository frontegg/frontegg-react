import { IInputChip } from '@frontegg/react-core';
import { Chip, Grid } from '@material-ui/core';
import React, { FC } from 'react';

export const InputChip: FC<IInputChip> = ({ chips, inputValue, onDelete, ...inputProps }) => (
  <div>
    <Grid container>
      {chips.map((chip, idx) => (
        <Grid item>
          <Chip label={chip} onDelete={() => onDelete(idx)} />
        </Grid>
      ))}
      <Grid item>
        <input {...inputProps} value={inputValue} />
      </Grid>
    </Grid>
  </div>
);
