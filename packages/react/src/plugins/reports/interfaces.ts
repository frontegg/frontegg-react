import { ComponentsTypeProps } from '@providers';
import { IReportsRouterComponents } from './ReportsRouter';
import { IReportsListPageComponents } from '@plugins/reports/pages/ReportsListPage';
import { IReportsTableComponents } from '@plugins/reports/pages/ReportsListPage/ReportsTable';
import { IReportRecord } from '@api/ReportsApi';

export interface IReportsPluginConfig {
  rootDir?: string;
  className?: string;
  cssVariables?: { [k in string]: number | string };
  ReportsRouter?: ComponentsTypeProps<IReportsRouterComponents>;
  ReportsListPage?: ComponentsTypeProps<IReportsListPageComponents>;
  ReportsTable?: ComponentsTypeProps<IReportsTableComponents<IReportRecord>>;
}
