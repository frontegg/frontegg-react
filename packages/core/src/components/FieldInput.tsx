import React, { FC, ReactNode } from 'react';
import { Field, FieldProps, ErrorMessage } from 'formik';
import { Input, InputProps, InputOnChangeData } from 'semantic-ui-react';
import classNames from 'classnames';

export interface IFieldInput extends InputProps {
  name: string;
  enterAnimation?: boolean;
  visible?: boolean;
  forwardRef?: any;
  wrapperClassName?: string;
  labelButton?: ReactNode;
}

export const FieldInput: FC<IFieldInput> =
  ({
     wrapperClassName, forwardRef, enterAnimation,
     visible, name, label,labelButton, onChange, ...inputProps
   }) => (
    <Field>
      {({ form: { values, handleBlur, handleChange, errors, touched } }: FieldProps) => (
        <div className={classNames('frontegg-form-row', 'frontegg-form-input', wrapperClassName)}>
          {label && <label>{label}</label>}
          {labelButton}
          <Input
            {...inputProps}
            ref={forwardRef}
            fluid
            name={name}
            values={values[name]}
            onChange={onChange ? (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
              onChange(event, data);
              handleChange(name)(event);
            } : handleChange(name)}
            onBlur={handleBlur}
            error={!!touched[name] && !!errors[name]}
          />
          <ErrorMessage name={name} className='frontegg-form-error' component='div'/>
        </div>
      )}
    </Field>
  );
