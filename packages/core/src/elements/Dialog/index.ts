import React, { FC } from 'react';
import { ElementsFactory } from '../../ElementsFactory';
import { DialogProps } from './interfaces';

export * from './interfaces';
export const Dialog: FC<DialogProps> = (props) => React.createElement(ElementsFactory.getElement('Dialog'), props);
