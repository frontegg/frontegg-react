import { ElementsFactory } from '../../ElementsFactory';
import React, { forwardRef } from 'react';
import { IconProps } from './interfaces';

export const Icon = forwardRef<HTMLElement, IconProps>((props, ref) =>
  React.createElement(ElementsFactory.getElement('Icon'), { ...props, ref } as any)
);
