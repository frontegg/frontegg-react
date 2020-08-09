import React, { Component, createElement } from 'react';
import { Button } from '@elements/Button';
import { render } from 'react-dom';

export { render, createElement };

export class FronteggAngularProvider extends Component {
  render() {
    return <div>
      <Button>TTT</Button>
    </div>;
  }
}
