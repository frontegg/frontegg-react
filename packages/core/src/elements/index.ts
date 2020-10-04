import { Elements } from '../ElementsFactory';

export * from './ErrorMessage';
export * from './Button';
export * from './Grid';
export * from './Table';
export * from './Icon';
export * from './Popup';
export * from './Checkbox';

import { FeButton } from './Button/FeButton';
import { FeGrid } from './Grid/FeGrid';
import { FeLoader } from './Loader/FeLoader';
import { FePopup } from './Popup/FePopup';
import { FeCheckbox } from './Checkbox/FeCheckbox';

export const fronteggElements: Partial<Elements> = {
  Loader: FeLoader,
  Button: FeButton,
  Grid: FeGrid,
  Popup: FePopup,
  Checkbox: FeCheckbox,
};
