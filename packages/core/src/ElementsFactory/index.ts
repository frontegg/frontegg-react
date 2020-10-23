import React from 'react';
import { ElementsFactory, fronteggElements } from './ElementsFactory';
import { SwitchToggleProps } from './interfaces';

export * from './interfaces';
export * from './FileInput';
export * from './Input';
export * from './Dialog';

export { ElementsFactory, fronteggElements };
export const SwitchToggle = (props: SwitchToggleProps) =>
  React.createElement(ElementsFactory.getElement('SwitchToggle'), props);
