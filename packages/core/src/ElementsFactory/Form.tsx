import { FormProps } from './interfaces';
import React from 'react';
import { ElementsFactory } from './ElementsFactory';
import { Form as FormikForm } from 'formik';
import classNames from 'classnames';

export const Form = (props: FormProps) => React.createElement(ElementsFactory.getElement('Form'), props);

export const FForm = ({ children, className, ...restProps }: FormProps) => {
  return (
    <Form as='div' className={classNames('fe-form', className)} {...restProps}>
      <FormikForm>{children}</FormikForm>
    </Form>
  );
};
