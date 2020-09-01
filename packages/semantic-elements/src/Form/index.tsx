import React from 'react';
import { Form as FormikForm } from 'formik';
import { IForm } from '@frontegg/react-core';
import { Form as SemanticForm, FormProps } from 'semantic-ui-react';

const mapper = (props: IForm): FormProps => props;

export class Form extends React.Component<IForm> {
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
