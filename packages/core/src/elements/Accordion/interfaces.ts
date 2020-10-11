import React, { ReactNode } from 'react';

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    children: NonNullable<ReactNode>;
    disabled?: boolean;
    expanded?: boolean;
    onChange?: (expended: boolean) => void;
}

export interface AccordionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    expandIcon?: ReactNode;
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> { }