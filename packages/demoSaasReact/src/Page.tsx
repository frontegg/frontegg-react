import React from 'react';
import '@frontegg/react/dist/cjs/style.css';
import { Reports } from '@frontegg/react';

export default class Page extends React.Component {

  render() {
    return <div>
      <Reports components={{
        ReportsListPage: {
        },
      }}/>
    </div>;
  }
}
