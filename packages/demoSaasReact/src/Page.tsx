import React from 'react';
import '@frontegg/react/dist/cjs/style.css';
import { Reports } from '@frontegg/react';

export default class Page extends React.Component {

  render() {
    return <div>
      <h2 style={{ padding: '20px', margin: 0 }}>React Version</h2>
      <hr/>
      <Reports components={{
        ReportsListPage: {
          // components: {
          //   PageHeader: {
          //     title: 'TTTTTT',
          //   },
          // },
        },
      }}/>
    </div>;
  }
}
