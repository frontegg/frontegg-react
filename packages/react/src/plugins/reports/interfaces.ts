import { ComponentsTypeProps } from '../../providers';
import { IReportsRouterComponents } from './ReportsRouter';
import { IReportsListPageComponents } from './pages/ReportsListPage';

export interface IReportsPluginConfig {
  rootDir?: string;
  className?: string;
  cssVariables?: { [k in string]: number | string };
  ReportsRouter?: ComponentsTypeProps<IReportsRouterComponents>;
  ReportsListPage?: ComponentsTypeProps<IReportsListPageComponents>;
}
