import React, { FC } from 'react';
import { Field, FieldProps, ErrorMessage } from 'formik';
import { Input, InputProps } from 'semantic-ui-react';

import './FieldInput.scss';

export interface IFieldInput extends InputProps {
  name: string;
}

export const FieldInput: FC<IFieldInput> = ({ name, label, ...inputProps }) => (
  <Field>
    {({ form: { values, handleBlur, handleChange, errors, touched } }: FieldProps) => (
      <div className='frontegg-form-row frontegg-form-input'>
        {label && <label>{label}</label>}
        <Input
          {...inputProps}
          fluid
          name={name}
          values={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!touched[name] && !!errors[name]}
        />
        <ErrorMessage name={name} className='frontegg-form-error' component='div' />
      </div>
    )}
  </Field>
);
