import { ButtonProps } from './interfaces';
import React, { FC } from 'react';
import { ElementsFactory } from './ElementsFactory';
import { useFormikContext } from 'formik';

export const Button = (props: ButtonProps) => React.createElement(ElementsFactory.getElement('Button'), props);
export const FButton: FC<ButtonProps> = (props) => {
  const { isValid, dirty, submitForm } = useFormikContext();
  const disableDirty = props.formikDisableIfNotDirty ?? true;
  return (
    <Button
      inForm
      {...props}
      disabled={!isValid || (disableDirty && !dirty)}
      size={props.size ?? props.type === 'submit' ? 'large' : undefined}
      onClick={(e) => {
        (props.type === 'submit' || props.submit) && submitForm();
        props.onClick?.(e);
      }}
      fullWidth={props.fullWidth ?? true}
    />
  );
};
