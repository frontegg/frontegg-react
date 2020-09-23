import { ElementsFactory } from '../../ElementsFactory';
import React, { forwardRef } from 'react';
import { useFormikContext } from 'formik';
import { ButtonProps } from './interfaces';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) =>
  React.createElement(ElementsFactory.getElement('Button'), { ...props, ref } as any));

export const FButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { isValid, dirty } = useFormikContext();
  const disableDirty = props.formikDisableIfNotDirty ?? true;
  return (
    <Button
      ref={ref}
      inForm
      {...props}
      disabled={!isValid || (disableDirty && !dirty)}
      size={props.size ?? props.type === 'submit' ? 'large' : undefined}
      fullWidth={props.fullWidth ?? true}
    />
  );
});
