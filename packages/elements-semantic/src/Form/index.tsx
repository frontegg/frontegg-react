import React from 'react';
import { Form as SemanticForm, FormProps as SemanticFormProps } from 'semantic-ui-react';
import { FormProps } from '@frontegg/react-core';

export class Form extends React.Component<FormProps> {
  render() {
    return <SemanticForm {...this.props} />;
  }
}
