import React from 'react';
import { IPageHeader, PageHeader } from '../../../components/PageHeader';
import {
  connectFrontegg,
  IFronteggMapper,
  ComponentsTypes,
  ComponentsTypesWithProps,
  FronteggClass,
} from '../../../providers';
import { omitProps } from '../../../helpers';


export type IReportsListPageComponents = {
  PageHeader: IPageHeader
  // ReportsTable: IReportsTable
}

export type IReportsListPage = {
  rootDir?: string;
  renderer?: (props: Omit<IReportsListPage, 'renderer' | 'components'>, components: ComponentsTypes<IReportsListPageComponents>) => React.ReactNode
  components?: ComponentsTypesWithProps<IReportsListPageComponents>;
}

const mapper =
  ({
     config: { reportsConfig },
     actions: { loadReports },
   }: IFronteggMapper) => ({
    loadReports,
    config: {
      components: reportsConfig.ReportsListPage,
    },
  });
type MapperProps = ReturnType<typeof mapper>

type Props = IReportsListPage & MapperProps;

class _ReportsListPage extends FronteggClass<IReportsListPageComponents, Props> {
  constructor(props: Props) {
    super(props, { PageHeader });
  }


  componentDidMount(): void {
    this.props.loadReports();
  }

  render() {
    const { renderer } = this.props;
    const { PageHeader } = this.comps;
    const { compsProps } = this;

    if (renderer) {
      return renderer(omitProps(this.props, ['renderer', 'components']), this.comps);
    }
    return <>
      <PageHeader title="Reports" subtitle='Generate insights on your account usage' {...compsProps.PageHeader}/>
      <div className='fe-page-content'>
        {/*  <SearchComponent onSearch={this.onSearch}/>*/}
        {/*  <ReportsTable/>*/}
      </div>
    </>;
  }
}


export const ReportsListPage = connectFrontegg(_ReportsListPage, mapper);

