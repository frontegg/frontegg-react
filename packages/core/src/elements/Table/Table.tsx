import React, { forwardRef } from 'react';
import { TableProps } from './interfaces';
import { ElementsFactory } from '../../ElementsFactory';

export const Table = forwardRef<HTMLTableElement, TableProps>((props, ref) =>
  React.createElement(ElementsFactory.getElement('Table'), { ...props, ref } as any)
);
