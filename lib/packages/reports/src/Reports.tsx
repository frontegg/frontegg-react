import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { connectFrontegg, IFronteggMapper, RegisterPlugin } from '@frontegg-react/core';
import { IReportsRouter, ReportsRouter } from './ReportsRouter';

export interface IReports extends IReportsRouter {
  className?: string
  style?: CSSProperties;
}

const mapper = ({ config: { reportsConfig } }: IFronteggMapper) => ({ reportsConfig });
type MapperProps = ReturnType<typeof mapper>

class _Reports extends React.Component<IReports & MapperProps> {

  buildCssVariable = (): CSSProperties => {
    const { style = {}, reportsConfig: { cssVariables = {} } } = this.props;
    return { ...cssVariables, ...style };
  };

  render() {
    const { className, reportsConfig } = this.props;
    return <div className={classNames('frontegg', 'fe-reports', reportsConfig?.className, className)} style={this.buildCssVariable()}>
      <ReportsRouter {...this.props}/>
    </div>;
  }
}

export const Reports = RegisterPlugin(connectFrontegg(_Reports, mapper));
