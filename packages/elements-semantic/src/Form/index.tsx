import React from 'react';
import { Form as SemanticForm, FormProps as SemanticFormProps } from 'semantic-ui-react';
import classNames from 'classnames';
import { FormProps } from '@frontegg/react-core';
import './style.scss';

const mapper = (props: FormProps): SemanticFormProps => ({
  className: classNames('fe-form', props.className),
  ...props,
});

export class Form extends React.Component<FormProps> {
  render() {
    const formProps = mapper(this.props);
    return <SemanticForm {...formProps} />;
  }
}
