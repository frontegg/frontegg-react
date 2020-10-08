import './styles/common.scss';

export * from './FronteggProvider';

export * from './api';

export * from './interfaces';
export * from './HOCs';
export * from './hooks';
export * from './helpers';
export { default as Logger } from './helpers/Logger';
export * from './elements';
export * from './components';
export * from './styles';

export * from './ElementsFactory';

export { memoEqual } from './helpers/DynamicComponent';

import { createElement } from 'react';
import { createPortal, render } from 'react-dom';

export const DOMProxy = {
  createElement,
  createPortal,
  render,
};
