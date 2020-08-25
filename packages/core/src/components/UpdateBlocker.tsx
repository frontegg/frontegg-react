import React from 'react';

/**
 * UploadBlocker with never rerender it's children if parent component rerender
 * this component used for preventing redux changes to render the vendor's whole app
 * that wrapped by FronteggProvider
 */
export class UpdateBlocker extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return this.props.children;
  }
}
