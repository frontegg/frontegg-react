import { Elements } from '../ElementsFactory';

export * from './ErrorMessage';
export * from './Button';
export * from './Grid';
export * from './Table';
export * from './Icon';

import { FeButton } from './Button/FeButton';
import { FeGrid } from './Grid/FeGrid';
import { FeIcon } from './Icon/FeIcon';

export const fronteggElements: Partial<Elements> = {
  Button: FeButton,
  Grid: FeGrid,
  Icon: FeIcon,
};
