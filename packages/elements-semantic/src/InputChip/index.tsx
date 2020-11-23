import { IInputChip } from '@frontegg/react-core';
import React, { FC } from 'react';
import { Grid } from 'semantic-ui-react';

export const InputChip: FC<IInputChip> = ({ chips, inputValue, ...inputProps }) => (
  <div>
    <Grid>
      {chips.map((chip, idx) => (
        <Grid.Column key={idx}>
          <span>{chip}</span>
        </Grid.Column>
      ))}
      <Grid item>
        <input {...inputProps} value={inputValue} />
      </Grid>
    </Grid>
  </div>
);
