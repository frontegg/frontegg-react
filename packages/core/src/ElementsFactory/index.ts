import React from 'react';
import { ElementsFactory, fronteggElements } from './ElementsFactory';
import { TabProps } from './interfaces';

export * from './interfaces';
export * from './FileInput';
export * from './Input';
export * from './Form';
export * from './Dialog';

export { ElementsFactory, fronteggElements };
export const Tabs = (props: TabProps) => React.createElement(ElementsFactory.getElement('Tabs'), props);
