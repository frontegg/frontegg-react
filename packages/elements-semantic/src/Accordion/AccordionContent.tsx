import React, { FC, useContext } from 'react';
import { AccordionContentProps } from '@frontegg/react-core';
import { AccordionContent as SemanticAccordionContent } from 'semantic-ui-react';
import { ActiveContext } from './AccordionActiveContext';

export const AccordionContent: FC<AccordionContentProps> = (props) => {
  const { active } = useContext(ActiveContext);
  return <SemanticAccordionContent active={active} {...props} />;
};
