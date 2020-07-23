import React from 'react';

export interface IReports {
  rootDir?: string
}

export class Reports extends React.Component<IReports> {

  render() {
    return 'Reports';
  }
}
