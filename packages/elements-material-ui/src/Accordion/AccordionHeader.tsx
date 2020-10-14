import React, { forwardRef } from 'react';
import { AccordionHeaderProps } from '@frontegg/react-core';
import { AccordionSummary as MaterialAccordionHeader } from '@material-ui/core';

export const AccordionHeader = forwardRef<HTMLDivElement, AccordionHeaderProps>((props, ref) => {
  return <MaterialAccordionHeader {...props} ref={ref} />;
});
