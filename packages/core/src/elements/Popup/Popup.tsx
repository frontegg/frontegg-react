import { PopupProps } from './interfaces';
import { ElementsFactory } from '../../ElementsFactory';
import React, { forwardRef } from 'react';

export const Popup = forwardRef<HTMLDivElement, PopupProps>((props, ref) =>
  React.createElement(ElementsFactory.getElement('Popup'), { ...props, ref } as any)
);
