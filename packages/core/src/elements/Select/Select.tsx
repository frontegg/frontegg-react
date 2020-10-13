import React from 'react';
import { ElementsFactory } from '../../ElementsFactory';
import { SelectProps } from './interfaces';

export const Select = (props: SelectProps) => React.createElement(ElementsFactory.getElement('Select'), props);
