import { Grid, Icon, IconNames } from '@frontegg/react-core';
import React, { FC } from 'react';

const icons: IconNames[] = [
  'back',
  'checkmark',
  'copy',
  'delete',
  'down-arrow',
  'edit',
  'filters',
  'image',
  'indeterminate',
  'left-arrow',
  'person-add',
  'right-arrow',
  'search',
  'send',
  'sort-arrows-asc',
  'sort-arrows-desc',
  'sort-arrows',
  'up-arrow',
  'vertical-dots',
  'visibility-off',
  'visibility',
  'warning',
  'globe',
  'close',
];
export const Icons: FC = () => (
  <Grid container spacing={4} className='fe-pt-2 fe-pb-2 fe-pr-2 fe-pl-2'>
    {icons.map((name, idx) => (
      <Grid item key={idx} className='fe-center'>
        <Icon name={name} />
        <div>{name}</div>
      </Grid>
    ))}
  </Grid>
);
