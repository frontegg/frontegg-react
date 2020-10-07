import React from 'react';
import { LoaderProps } from '../elements/Loader';
import { ElementsFactory } from './ElementsFactory';
import { SwitchToggleProps, TabProps } from './interfaces';

export * from './interfaces';
export * from './FileInput';
export * from './Input';
export * from './Form';
export * from './Dialog';

export { ElementsFactory };
export const SwitchToggle = (props: SwitchToggleProps) =>
  React.createElement(ElementsFactory.getElement('SwitchToggle'), props);
export const Tabs = (props: TabProps) => React.createElement(ElementsFactory.getElement('Tabs'), props);
