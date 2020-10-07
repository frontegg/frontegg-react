import { Elements } from '../ElementsFactory';

export * from './ErrorMessage';
export * from './Button';
export * from './Loader';
export * from './Tag';
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
import { FeTag } from './Tag/FeTag';

export const fronteggElements: Partial<Elements> = {
  Loader: FeLoader,
  Tag: FeTag,
  Button: FeButton,
  Grid: FeGrid,
  Popup: FePopup,
  Checkbox: FeCheckbox,
};
