import React, { forwardRef } from 'react';
import { ElementsFactory } from '../../ElementsFactory';
import { AccordionContentProps, AccordionHeaderProps, AccordionProps } from './interfaces';

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>((props, ref) =>
  React.createElement(ElementsFactory.getElement('Accordion'), { ...props, ref } as any)
);

export const AccordionHeader = forwardRef<HTMLDivElement, AccordionHeaderProps>((props, ref) =>
  React.createElement(ElementsFactory.getElement('AccordionHeader'), { ...props, ref } as any)
);

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>((props, ref) =>
  React.createElement(ElementsFactory.getElement('AccordionContent'), { ...props, ref } as any)
);
