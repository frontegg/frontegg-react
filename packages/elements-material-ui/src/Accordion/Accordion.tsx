import React, { forwardRef } from 'react';
import { AccordionProps } from '@frontegg/react-core';
import { Accordion as MaterialAccordion, AccordionProps as MaterialAccordionProps } from '@material-ui/core';

const mapper = (props: AccordionProps): MaterialAccordionProps => {
  const { onChange, ...rest } = props;
  return {
    onChange: onChange ? (_, expended) => onChange(expended) : undefined,
    ...rest,
  };
};

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
  return <MaterialAccordion {...mapper(props)} ref={ref} />;
});
