import { FormProps } from './interfaces';
import React from 'react';
import { ElementsFactory } from './ElementsFactory';
import { Form as FormikForm } from 'formik';

export const Form = (props: FormProps) => React.createElement(ElementsFactory.getElement('Form'), props);

export const FForm = (props: FormProps) => {
  return (
    <Form as='div' {...props}>
      <FormikForm>{props.children}</FormikForm>
    </Form>
  );
};
