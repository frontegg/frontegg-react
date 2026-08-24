import React, { forwardRef } from 'react';
import { MenuProps } from './interfaces';
import { ElementsFactory } from '../../ElementsFactory';

export * from './interfaces';

export const Menu = forwardRef<HTMLDivElement, MenuProps>((props, ref) =>
  React.createElement(ElementsFactory.getElement('Menu'), { ...props, ref } as any)
);
