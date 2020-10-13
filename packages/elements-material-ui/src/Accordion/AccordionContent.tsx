import React, { forwardRef } from 'react';
import { AccordionContentProps } from '@frontegg/react-core';
import { AccordionDetails as MaterialAccordionContent } from '@material-ui/core';

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>((props, ref) => {
  return <MaterialAccordionContent {...props} ref={ref} />;
});
