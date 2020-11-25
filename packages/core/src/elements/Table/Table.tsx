import React, { forwardRef, ReactElement, Ref } from 'react';
import { TableProps } from './interfaces';
import { ElementsFactory } from '../../ElementsFactory';

export const Table = forwardRef((props, ref) =>
  React.createElement(ElementsFactory.getElement('Table'), { ...props, ref } as any)
) as <T extends object = {}>(props: TableProps<T> & { ref?: Ref<HTMLTableElement> }) => ReactElement;
