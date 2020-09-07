import React from 'react';
import { Form as SemanticForm, FormProps as SemanticFormProps } from 'semantic-ui-react';
import classNames from 'classnames';
import { Form as FormikForm } from 'formik';
import { FormProps } from '@frontegg/react-core';
import './style.scss';

const mapper = (props: FormProps): SemanticFormProps => ({
  className: classNames('fe-form', props.className),
  ...props,
});

export class Form extends React.Component<FormProps> {
  render() {
    const { children, inFormik, ...rest } = this.props;
    const formProps = mapper(rest);
    if (inFormik ?? true) {
      return (
        <SemanticForm as='div'>
          <FormikForm>{children}</FormikForm>
        </SemanticForm>
      );
    }
    return <SemanticForm {...formProps}>{children}</SemanticForm>;
  }
}
