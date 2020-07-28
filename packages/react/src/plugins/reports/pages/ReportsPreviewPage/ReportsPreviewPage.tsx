import React from 'react';
import { IPageHeader, PageHeader } from '../../../../components/PageHeader';
import { RouteComponentProps, withRouter } from 'react-router';
import { IReportGenerateTab, ReportGenerateTab } from './ReportGenerateTab';
import { IReportScheduleTab, ReportScheduleTab } from './ReportScheduleTab';
import { buildPropsComponents, ComponentsTypes, ComponentsTypesWithProps, connectFrontegg, IFronteggMapper } from '@providers';
import { Loader, ITabsProps, Iframe, IframeProps } from '@elements';

type Components = {
  PageHeader: IPageHeader,
  ReportGenerateTab: IReportGenerateTab,
  ReportScheduleTab: IReportScheduleTab,
  Iframe: IframeProps,
}

export interface IReportsPreviewPage {
  components?: ComponentsTypesWithProps<Components>;
}

const mapper =
  ({
     state: { reportById, renderedReportById },
     actions: { loadReportById, renderReportById },
   }: IFronteggMapper) => ({ reportById, renderedReportById, loadReportById, renderReportById });
type MapperProps = ReturnType<typeof mapper>

class _ReportsPreviewPage extends React.Component<IReportsPreviewPage & MapperProps & RouteComponentProps<{ idx: string }>> {
  components: ComponentsTypes<Components>;

  state = {
    activeIndex: 0,
  };

  constructor(props: any) {
    super(props);
    this.components = buildPropsComponents(props.components, {
      PageHeader,
      ReportGenerateTab,
      ReportScheduleTab,
      Iframe,
    });
  }

  componentDidMount(): void {
    const { loadReportById, renderReportById, match: { params: { idx } } } = this.props;
    loadReportById(idx);
    renderReportById({ id: idx, responseType: 'html' });
  }

  render() {
    const {
      PageHeader, ReportGenerateTab, ReportScheduleTab,
      // Iframe
    } = this.components;
    const {
      reportById: { loading, data: report },
      renderedReportById: { loading: renderLoading, data: renderResult },
    } = this.props;
    const { activeIndex } = this.state;
    if (loading) {
      return <Loader centered/>;
    }
    const tabProps: ITabsProps = {
      activeIndex,
      tabs: ['Generate', 'Schedule'],
      onTabChange: (activeIndex) => this.setState({ activeIndex }),
    };
    return <>
      <PageHeader title={report?.name} tabs={tabProps} onBackButtonClick={this.props.history.goBack}/>

      <div className='fe-page-content fe-report-preview'>
        <div className='fe-report-preview__sidebar'>
          {activeIndex === 0 ? <ReportGenerateTab/> : <ReportScheduleTab/>}
        </div>
        <div className='fe-report-preview__content'>
          {renderLoading ? <Loader centered/> : <Iframe title="Reports Preview" html={renderResult?.html ?? ''}/>}
        </div>
      </div>
    </>;
  }
}

export const ReportsPreviewPage = withRouter(connectFrontegg(_ReportsPreviewPage, mapper));
