import React from 'react';
import './FeForm.scss';
import { FormProps } from './interfaces';

export class FeForm extends React.Component<FormProps> {
  render() {
    return <div {...(this.props as any)} />;
  }
}
