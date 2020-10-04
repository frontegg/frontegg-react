import { Elements } from '../ElementsFactory';

export * from './ErrorMessage';
export * from './Button';
export * from './Grid';
export * from './Table';
export * from './Icon';
export * from './Popup';

import { FeButton } from './Button/FeButton';
import { FeGrid } from './Grid/FeGrid';
import { FePopup } from './Popup/FePopup';

export const fronteggElements: Partial<Elements> = {
  Button: FeButton,
  Grid: FeGrid,
  Popup: FePopup,
};
