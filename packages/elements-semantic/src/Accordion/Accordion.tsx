import React, { FC, useCallback, useState } from 'react';
import { AccordionProps } from '@frontegg/react-core';
import { Accordion as SemanticAccordion } from 'semantic-ui-react';
import { ActiveContext } from './AccordionActiveContext';
import classNames from 'classnames';
import './style.scss';

export const Accordion: FC<AccordionProps> = (props) => {
  const [innerActive, setInnerActive] = useState(false);

  const { onChange = setInnerActive, children, expanded, ...rest } = props;

  const active = expanded ?? innerActive;

  const toggleActive = useCallback(() => {
    onChange(!active);
  }, [onChange, active]);

  const className = classNames(props.className, { ['fe-semantic-accordion__disabled']: props.disabled });

  return (
    <ActiveContext.Provider value={{ active, toggleActive }}>
      <SemanticAccordion className={className} {...rest}>
        {children}
      </SemanticAccordion>
    </ActiveContext.Provider>
  );
};
