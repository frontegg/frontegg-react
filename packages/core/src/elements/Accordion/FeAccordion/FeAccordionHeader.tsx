import React, { forwardRef, useCallback, useContext } from 'react';
import { ClassNameGenerator } from '../../../styles';
import { AccordionHeaderProps } from '../interfaces';
import { FeAccordionContext } from './FeAccordionContext';
import './FeAccordionHeader.scss';

const prefixCls = 'fe-accordion-header';
export const FeAccordionHeader = forwardRef<HTMLDivElement, AccordionHeaderProps>((props, ref) => {
    const { expanded, setExpanded } = useContext(FeAccordionContext);
    const { className, children, expandIcon, ...rest } = props;

    const classes = ClassNameGenerator.generate({
        prefixCls,
        className
    }, expanded && 'expanded');

    const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

    return (
        <div ref={ref} className={classes} onClick={toggleExpanded} {...rest}>
            {children}
            <div className={`${prefixCls}__icon`}>{expandIcon}</div>
        </div>
    );
});
