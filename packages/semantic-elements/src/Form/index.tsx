import React from 'react';
import { Form as FormikForm } from 'formik';
import { FormProps } from '@frontegg/react-core';
import { Form as SemanticForm, FormProps as SemanticFormProps } from 'semantic-ui-react';

const mapper = (props: FormProps): SemanticFormProps => props;

export class Form extends React.Component<FormProps> {
  render() {
    const { children, formik, ...rest } = this.props;
    const formProps = mapper(rest);
    if (formik) {
      return <SemanticForm as='div'>
        <FormikForm>
          {children}
        </FormikForm>
      </SemanticForm>;
    }
    return <SemanticForm {...formProps}>
      {children}
    </SemanticForm>;
  }
}
