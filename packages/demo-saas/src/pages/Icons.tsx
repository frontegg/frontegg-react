import { Grid, Icon, IconNames } from '@frontegg/react-core';
import React, { FC } from 'react';

const icons: IconNames[] = [
  'back',
  'up-arrow',
  'down-arrow',
  'left-arrow',
  'right-arrow',
  'indeterminate',
  'checkmark',
  'copy',
  'search',
  'warning',
  'image',
  'delete',
  'visibility',
  'visibility-off',
  'filters',
  'sort-arrows',
  'sort-arrows-asc',
  'sort-arrows-desc',
  'person-add',
  'vertical-dots',
  'send',
];
export const Icons: FC = () => (
  <Grid container spacing={4} className='fe-pt-2 fe-pb-2 fe-pr-2 fe-pl-2'>
    {icons.map((name, idx) => (
      <Grid item key={idx}>
        <Icon name={name} />
        <div>{name}</div>
      </Grid>
    ))}
  </Grid>
);
