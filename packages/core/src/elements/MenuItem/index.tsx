import React, { forwardRef } from 'react';
import { MenuItemProps } from './interfaces';
import { ElementsFactory } from '../../ElementsFactory';

export * from './interfaces';

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>((props, ref) =>
  React.createElement(ElementsFactory.getElement('MenuItem'), { ...props, ref } as any)
);
