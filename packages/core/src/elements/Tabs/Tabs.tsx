import React from 'react';
import { TabProps } from './interfaces';
import { ElementsFactory } from '../../ElementsFactory';

export const Tabs = (props: TabProps) => React.createElement(ElementsFactory.getElement('Tabs'), props);
