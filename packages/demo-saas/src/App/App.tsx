import React from 'react';
import { Component1 } from '../Component1';
import { Component2 } from '../Component2';
import { Component3 } from '../Component3';
import { withFrontegg } from '../withFrontegg';

class App extends React.Component<any> {
  render() {
    return <div className='app'>
      <Component1/>
      <Component2/>
      <Component3/>
    </div>;
  }
}

export default withFrontegg(App);
