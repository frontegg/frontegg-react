import React, { FC, useContext } from 'react';
import { AccordionHeaderProps, Icon } from '@frontegg/react-core';
import { AccordionTitle as SemanticAccordionHeader } from 'semantic-ui-react';
import { ActiveContext } from './AccordionActiveContext';

export const AccordionHeader: FC<AccordionHeaderProps> = (props) => {
  const { children, expandIcon, ...rest } = props;
  const { active, toggleActive } = useContext(ActiveContext);
  return (
    <SemanticAccordionHeader active={active} onClick={toggleActive} {...rest}>
      {children}
      {expandIcon}
    </SemanticAccordionHeader>
  );
};
