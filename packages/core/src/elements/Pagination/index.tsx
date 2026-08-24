import React, { forwardRef } from 'react';
import { PaginationProps } from './interfaces';
import { ElementsFactory } from '../../ElementsFactory';

export * from './interfaces';

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>((props, ref) =>
  React.createElement(ElementsFactory.getElement('Pagination'), { ...props, ref } as any)
);
