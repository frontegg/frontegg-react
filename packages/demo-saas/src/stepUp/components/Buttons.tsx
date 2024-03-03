import React from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { DemoButton } from '../../DemoButton';

export const StepUpButton = (props: any) => (
  <DemoButton variant='contained' startIcon={<TrendingUpIcon />} {...props} />
);
