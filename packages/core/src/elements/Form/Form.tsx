import React from 'react';
import { Form as FormikForm } from 'formik';
import classNames from 'classnames';
import { FormProps } from './interfaces';
import { ElementsFactory } from '../../ElementsFactory';

export const Form = (props: FormProps) => React.createElement(ElementsFactory.getElement('Form'), props);

export const FForm = ({ children, className, ...restProps }: FormProps) => {
  return (
    <Form as='div' className={classNames('fe-form', className)} {...restProps}>
      <FormikForm>{children}</FormikForm>
    </Form>
  );
};
