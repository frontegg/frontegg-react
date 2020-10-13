import React, { forwardRef, useCallback, useState } from 'react';
import { ClassNameGenerator } from '../../../styles';
import { AccordionProps } from '../interfaces';
import { FeAccordionContext } from './FeAccordionContext';
import './FeAccordion.scss';

const prefixCls = 'fe-accordion';
export const FeAccordion = forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
  const [innerExpanded, setInnerExpanded] = useState(false);
  const { className, children, disabled, expanded: expandedFromProps, onChange, ...rest } = props;

  const expanded = expandedFromProps ?? innerExpanded;

  const classes = ClassNameGenerator.generate(
    {
      prefixCls,
      className,
      theme: props.disabled ? 'disabled' : undefined,
    },
    expanded && 'expanded'
  );

  return (
    <FeAccordionContext.Provider value={{ expanded, setExpanded: onChange ?? setInnerExpanded }}>
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    </FeAccordionContext.Provider>
  );
});
