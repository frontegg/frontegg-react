import React from 'react';
import { FronteggProvider } from '@frontegg/react';
import Page from './Page';

export default class App extends React.Component {

  render() {
    return <FronteggProvider contextOptions={{
      baseUrl: `http://localhost:8081`,
      tokenResolver: () => 'my-authentication-token',
    }}>
      <Page/>
    </FronteggProvider>;
  }
}
