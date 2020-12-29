import React, { FC } from 'react';
import { Grid } from '@frontegg/react-core';
import { AuditsHeader } from './AuditsHeader';
import './styles.scss';
import { AuditsSubHeader } from './AuditsSubHeader';
import { prefixCls } from './constants';
import { AuditsTable } from './AuditsTable';

export const AuditsPage: FC = () => {
  return (
    <Grid container direction='column' wrap='nowrap' className={prefixCls}>
      <AuditsHeader />
      <AuditsSubHeader />
      <AuditsTable />
    </Grid>
  );
};
