import { Elements } from '../ElementsFactory';

export * from './ErrorMessage';
export * from './Button';
export * from './Grid';

import { FeButton } from './Button/FeButton';
import { FeGrid } from './Grid/FeGrid';

export const fronteggElements: Partial<Elements> = {
  Button: FeButton,
  Grid: FeGrid,
};
