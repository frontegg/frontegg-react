import React from 'react';
import { FormProps } from '@frontegg/react-core';
import './style.scss';

export class Form extends React.Component<FormProps> {
  render() {
    return <div {...(this.props as any)} />;
  }
}
