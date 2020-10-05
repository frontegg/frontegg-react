import React from 'react';
import { LoaderProps } from '../elements/Loader/interfaces';
import { ElementsFactory } from './ElementsFactory';
import { SwitchToggleProps, TabProps } from './interfaces';

export * from './interfaces';
export * from './FileInput';
export * from './Input';
export * from './Form';
export * from './Dialog';

export { ElementsFactory };
export const Loader = (props: LoaderProps) => React.createElement(ElementsFactory.getElement('Loader'), props);
export const SwitchToggle = (props: SwitchToggleProps) =>
  React.createElement(ElementsFactory.getElement('SwitchToggle'), props);
export const Tabs = (props: TabProps) => React.createElement(ElementsFactory.getElement('Tabs'), props);
