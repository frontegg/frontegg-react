import React from 'react';
import { connectFrontegg } from '../../providers/StateProvider';

export interface IReports {

}

export class Reports extends React.Component<Reports> {

  render() {
    return 'Reports';
  }
}


connectFrontegg(Reports,
  ({
     state: { reports },
     actions: { loadReports },
   }) => ({
    reports,
    loadReports,
  }));
