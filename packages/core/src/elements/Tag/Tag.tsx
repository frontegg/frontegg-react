import React, { forwardRef } from 'react';
import { ElementsFactory } from '../../ElementsFactory';
import { TagProps } from './interfaces';

export const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref) =>
  React.createElement(ElementsFactory.getElement('Tag'), { ...props, ref } as any)
);
