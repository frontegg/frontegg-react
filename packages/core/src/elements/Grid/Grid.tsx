import React, { forwardRef } from 'react';
import { ElementsFactory } from '../../ElementsFactory';
import { GridProps } from './inteterfaces';
import './grid.scss';

export const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) =>
  React.createElement(ElementsFactory.getElement('Grid'), { ...props, ref } as any)
);
