import { ElementsFactory } from '../../ElementsFactory';
import React from 'react';
import { IconProps } from './interfaces';

export const Icon = (props: IconProps) => React.createElement(ElementsFactory.getElement('Icon'), props);
