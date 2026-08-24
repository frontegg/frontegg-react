import React from 'react';
import { ElementsFactory } from '../../ElementsFactory';
import { LoaderProps } from './interfaces';

export const Loader = (props: LoaderProps) => React.createElement(ElementsFactory.getElement('Loader'), props);
