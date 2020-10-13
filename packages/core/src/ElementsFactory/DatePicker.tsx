import { DatePickerProps } from './interfaces';
import React from 'react';
import { ElementsFactory } from './ElementsFactory';
import { useField } from 'formik';

export const DatePicker = (props: DatePickerProps) => {
  return React.createElement(ElementsFactory.getElement('DatePicker'), props);
};

export const FDatePicker = (props: DatePickerProps & { name: string }) => {
  const [datePickerProps] = useField(props.name);
  const { onChange } = props;
  return (
    <DatePicker
      {...datePickerProps}
      {...props}
      fullWidth={props.fullWidth ?? true}
      onChange={(e) => {
        onChange?.(e);
        datePickerProps?.onChange(e);
      }}
    />
  );
};
