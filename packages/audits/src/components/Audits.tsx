import React, { FC, useEffect } from 'react';
import { Grid } from '@frontegg/react-core';
import { AuditsHeader } from './AuditsHeader';
import './styles.scss';
import { AuditsSubHeader } from './AuditsSubHeader';
import { prefixCls } from './constants';
import { AuditsTable } from './AuditsTable';
import { ContextHolder } from '@frontegg/rest-api';
import { useAuditsActions } from '../helpers/hooks';

export const AuditsPage: FC = () => {
  const { setVirtualScroll } = useAuditsActions();

  useEffect(() => {
    const context = ContextHolder.getContext();
    setVirtualScroll(!!context?.auditsOptions?.virtualScroll);
  }, [setVirtualScroll]);

  return (
    <Grid container direction='column' wrap='nowrap' className={prefixCls}>
      <AuditsHeader />
      <AuditsSubHeader />
      <AuditsTable />
    </Grid>
  );
};
