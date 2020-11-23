import React, { forwardRef } from 'react';
import { ElementsFactory } from '../../ElementsFactory';
import { useField } from 'formik';
import { CheckboxProps } from './interfaces';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) =>
  React.createElement(ElementsFactory.getElement('Checkbox'), { ...props, ref } as any)
);

export const FCheckbox = forwardRef<HTMLInputElement, CheckboxProps & { name: string }>((props, ref) => {
  const [inputProps, { touched, error }, { setValue }] = useField(props.name);
  const { onChange } = props;

  return (
    <Checkbox
      ref={ref}
      inForm
      {...inputProps}
      {...props}
      fullWidth={props.fullWidth ?? true}
      onChange={(e) => {
        onChange?.(e);
        // inputProps.onChange(e);
        setValue(inputProps.value === undefined ? true : inputProps.value === true ? false : true);
      }}
      error={touched && error ? error : undefined}
    />
  );
});
