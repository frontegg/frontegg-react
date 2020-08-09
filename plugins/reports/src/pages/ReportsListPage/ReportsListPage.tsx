import React from 'react';
import { IPageHeader, PageHeader } from '@components/PageHeader';
import {
  connectFrontegg, IFronteggMapper, ComponentsTypesWithProps, FronteggClass, RendererFunction,
} from '@providers';
import { omitProps } from '@helpers';
import { IReportsTable, ReportsTable } from './ReportsTable';


export type IReportsListPageComponents = {
  PageHeader: IPageHeader
  ReportsTable: IReportsTable
}

export type IReportsListPage = {
  rootDir?: string;
  renderer?: RendererFunction<IReportsListPage, IReportsListPageComponents>;
  components?: ComponentsTypesWithProps<IReportsListPageComponents>;
}

const mapper =
  ({
     t,
     config: { reportsConfig: { ReportsListPage } },
     actions: { loadReports },
   }: IFronteggMapper) => ({
    t,
    loadReports,
    config: ReportsListPage,
  });

type Props = IReportsListPage & ReturnType<typeof mapper>;

class _ReportsListPage extends FronteggClass<IReportsListPageComponents, Props> {
  constructor(props: Props) {
    super(props, { PageHeader, ReportsTable });
  }

  componentDidMount(): void {
    this.props.loadReports();
  }

  render() {
    const { t, renderer } = this.props;
    const { PageHeader, ReportsTable } = this.comps;
    const { compsProps } = this;

    if (renderer) {
      return renderer(omitProps(this.props, ['renderer', 'components']), this.comps);
    }
    return <>
      <PageHeader title={t('reports.list-page.title')}
                  subtitle={t('reports.list-page.subtitle')}
                  {...compsProps.PageHeader}/>
      <div className='fe-page-content'>
        {/*  <SearchComponent onSearch={this.onSearch}/>*/}
        <ReportsTable/>
      </div>
    </>;
  }
}

export const ReportsListPage = connectFrontegg(_ReportsListPage, mapper);

