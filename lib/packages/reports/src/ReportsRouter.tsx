import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { connectFrontegg, IFronteggMapper } from '@frontegg-react/core';
import { IReportsListPage, ReportsListPage } from './pages/ReportsListPage';
import { IReportsPreviewPage, ReportsPreviewPage } from './pages/ReportsPreviewPage';
import { ComponentsTypesWithProps, ComponentsTypes, buildPropsComponents } from '@providers';

export type IReportsRouterComponents = {
  ReportsListPage: IReportsListPage;
  ReportsPreviewPage: IReportsPreviewPage;
}

export interface IReportsRouterProps {
  rootDir?: string;
  renderer?: (props: IReportsRouterProps, components: ComponentsTypes<IReportsRouterComponents>) => React.ReactNode
}

export type IReportsRouter = IReportsRouterProps & {
  components?: ComponentsTypesWithProps<IReportsRouterComponents>;
}

const mapper = ({ config: { reportsConfig } }: IFronteggMapper) => ({
  config: {
    rootDir: reportsConfig.rootDir,
    components: reportsConfig.ReportsRouter,
  },
});
type MapperProps = ReturnType<typeof mapper>


class _ReportsRouter extends React.Component<IReportsRouter & MapperProps> {
  components: ComponentsTypes<IReportsRouterComponents>;

  constructor(props: any) {
    super(props);
    this.components = buildPropsComponents({
      ...props.config.components,
      ...props.components,
    }, {
      ReportsListPage,
      ReportsPreviewPage,
    });
  }

  buildConfig = (): Required<IReportsRouterProps> => {
    const { rootDir, renderer } = this.props;
    return {
      rootDir: rootDir || '/reports',
      renderer: renderer || this.defaultRenderer,
    };
  };


  defaultRenderer = (props: Omit<IReportsRouterProps, 'renderer'>, components: ComponentsTypes<IReportsRouterComponents>) => {
    return <BrowserRouter basename={props.rootDir}>
      <Switch>
        <Route path='/' exact={true} component={components.ReportsListPage}/>
        <Route path='/report/:id' component={components.ReportsPreviewPage}/>
        <Route path='*' component={() => <Redirect to='/'/>}/>
      </Switch>
    </BrowserRouter>;
  };

  render() {
    const { renderer, ...rest } = this.buildConfig();
    return renderer(rest, this.components);
  }
}

export const ReportsRouter = connectFrontegg(_ReportsRouter, mapper);
