import React, { FC, useContext, useLayoutEffect, useRef } from 'react';
import { ClassNameGenerator } from '../../../styles';
import { AccordionContentProps } from '../interfaces';
import { FeAccordionContext } from './FeAccordionContext';
import './FeAccordionContent.scss';

const prefixCls = 'fe-accordion-content';
export const FeAccordionContent: FC<AccordionContentProps> = (props) => {
    const ref = useRef<HTMLDivElement>(null);

    const { expanded } = useContext(FeAccordionContext);
    const { className, children, ...rest } = props;

    const classes = ClassNameGenerator.generate({
        prefixCls,
        className,
    });

    useLayoutEffect(() => {
        if (!ref.current)
            return;

        ref.current.style.maxHeight = expanded ? `${ref.current.scrollHeight}px` : '';
    }, [expanded]);

    return (
        <div ref={ref} className={classes} {...rest}>
            {children}
        </div>
    );
}
